<template>
  <div id="content">
    <!-- 视频流 -->
    <div style="display: flex;position: relative">
      <div v-if="showPanorama" id="containerVr"></div>
      <div id="player" :style="styleObject"></div>
    </div>
    <!--  公共配置  -->
    <head-panle></head-panle>
    <head-menu></head-menu>
    <!--页面-->
    <content-panle-digital v-if="!$route.query.page"></content-panle-digital>
    <content-panle-alarm v-if="$route.query.page==='alarm'"></content-panle-alarm>
    <content-panle-scenario v-if="$route.query.page==='scenario'" ref="scenario"></content-panle-scenario>
    <explain-auto></explain-auto>
  </div>
</template>

<script>
/* eslint-disable */
import config from "@/utils/config.js";
import HeadPanle from "@/views/screen/view/HeadPanle.vue";
import HeadMenu from "@/views/screen/view/HeadMenu.vue";
import ContentPanleDigital from "@/views/screen/view/ContentPanleDigital.vue";
import treeId from "@/utils/freedo";
import ContentPanleAlarm from "@/views/screen/view/ContentPanleAlarm.vue";
import PANO0001 from "@/assets/screenimages/002.jpg";
import * as THREE from "three";
import ContentPanleScenario from "@/views/screen/view/ContentPanleScenario.vue";
import ExplainAuto from "@/components/ExplainAuto.vue";
import {addMarkerCamera} from "@/utils/marker";

export default {
  name: "Screen",
  components: {ExplainAuto, ContentPanleScenario, ContentPanleAlarm, ContentPanleDigital, HeadMenu, HeadPanle},
  computed: {
    styleObject() {
      return {
        position: 'absolute',
        width: `${this.width}px`,
        height: '1080px',
        left: `${this.left}px`,
      };
    },
  },
  data() {
    return {
      instanceId: config[process.env.NODE_ENV].playerExampleId, //实例id

      showPanorama: false,
      width: 1920,
      left: 0,

      addPlaneClip: false,
    };
  },
  mounted() {
    // 缩放
    this.screenTransform();
    window.addEventListener('resize', () => {
      this.screenTransform();
    });
    document.addEventListener("keydown", this.onKeyDown);
    this.initPlayer();
  },
  methods: {
    //apply
    panorama360() {
      this.width = 960
      this.left = 960
      this.showPanorama = true
      this.$nextTick(() => {
        this.init360()
      })
    },
    rePanorama360() {
      if (this.showPanorama) {
        this.width = 1920
        this.left = 0
        this.showPanorama = false
      }
    },
    init360(img) {
      img = img ? img : PANO0001;
      const containerVr = document.getElementById('containerVr');
      containerVr.innerHTML = '';

      // 初始化用户交互变量
      let isUserInteracting = false,
          onPointerDownMouseX = 0, onPointerDownMouseY = 0,
          lon = 0, onPointerDownLon = 0,
          lat = 0, onPointerDownLat = 0,
          phi = 0, theta = 0;

      // 创建相机对象
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);

      // 创建场景对象
      const scene = new THREE.Scene();

      // 创建球体几何体，表示全景图的表面
      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1);

      // 加载并设置全景图纹理
      const texture = new THREE.TextureLoader().load(img);
      texture.colorSpace = THREE.SRGBColorSpace;
      const material = new THREE.MeshBasicMaterial({map: texture});

      // 创建网格对象，将几何体和材质结合
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // 创建渲染器并设置参数
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(1920 / 2, 1080);
      renderer.setPixelRatio(window.devicePixelRatio);

      // 将渲染器的DOM元素添加到容器中
      containerVr.appendChild(renderer.domElement);
      containerVr.style.touchAction = 'none';

      // 添加事件监听器以处理用户交互
      containerVr.addEventListener('pointerdown', onPointerDown);
      document.addEventListener('wheel', onDocumentMouseWheel);

      // 窗口大小调整事件
      // window.addEventListener('resize', onWindowResize);

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      // Pointer Down事件处理
      function onPointerDown(event) {
        if (event.isPrimary === false) return;
        isUserInteracting = true;
        onPointerDownMouseX = event.clientX;
        onPointerDownMouseY = event.clientY;
        onPointerDownLon = lon;
        onPointerDownLat = lat;
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
      }

      // Pointer Move事件处理
      function onPointerMove(event) {
        if (event.isPrimary === false) return;
        lon = (onPointerDownMouseX - event.clientX) * 0.1 + onPointerDownLon;
        lat = (event.clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
      }

      // Pointer Up事件处理
      function onPointerUp() {
        if (event.isPrimary === false) return;
        isUserInteracting = false;
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
      }

      // 滚轮事件处理
      function onDocumentMouseWheel(event) {
        if (event.toElement.getAttribute('data-engine') && event.toElement.getAttribute('data-engine').indexOf('three.js') > -1) {
          const fov = camera.fov + event.deltaY * 0.05;
          camera.fov = THREE.MathUtils.clamp(fov, 10, 75);
          camera.updateProjectionMatrix();
        }
      }

      // 动画循环
      function animate() {
        requestAnimationFrame(animate);
        update();
      }

      // 更新函数，处理相机位置和渲染
      function update() {
        // if (isUserInteracting === false) {
        //   lon += 0.02;
        // }
        lat = Math.max(-85, Math.min(85, lat));
        phi = THREE.MathUtils.degToRad(90 - lat);
        theta = THREE.MathUtils.degToRad(lon);
        const x = 500 * Math.sin(phi) * Math.cos(theta);
        const y = 500 * Math.cos(phi);
        const z = 500 * Math.sin(phi) * Math.sin(theta);
        camera.lookAt(x, y, z);
        renderer.render(scene, camera);
      }

      animate();
    },
    planeClip() {
      this.addPlaneClip = true
    },
    async planeClip_event(x, y, z) {
      let bbox = [x, y, z];
      let camera = await __g.camera.get();
      let rotation = [camera.pitch, camera.yaw + 90, 0];
      __g.tools.startPlaneClip(bbox, rotation, false, true);
    },
    rePlaneClip() {
      __g.tools.stopPlaneClip();
      if (this.$route.query.page === 'scenario') {
        if (this.$refs.scenario.$refs.leftMenu.currentBtn === 5)
          this.$refs.scenario.$refs.leftMenu.currentBtn = null
      }
    },

    screenTransform() { // 拉伸缩放的方式
      let width = window.innerWidth;
      let height = window.innerHeight;
      let _obj = document.getElementById('content');
      let scale = `scale(${width / 1920},${height / 1080})`;
      document.documentElement.style.setProperty('--primary-scale', scale);
      _obj.style.transform = scale;
    },
    onKeyDown(event) {
      // 检测按下的键
      // console.log(event.key)
      if (event.key === "Escape") {
        this.rePlaneClip()
      }
    },
    // 初始化视频
    initPlayer() {
      let host = config[process.env.NODE_ENV].playerPath;
      let _onReady = async () => {
        __g.camera.stopAnimation()
        __g.tools.stopPlaneClip();
        __g.tools.stopVolumeClip();
        __g.infoTree.hide([
          'F6ABC22442B91B5EF7C740BAE23991BA',//商场模型
          'FBE4932F4A31B2BEE5955B835E017551',//结构模型
          '2FBB0F894CFD2ECF697760A7DCA61969',//项目模型
          '349280C44403CF4FA47257999931BEF5',//工程走向
        ])
        __g.infoTree.show([
          '9561C9FE4B3F953060DA20993729C110',//在建
          'F762F9024430C36142D448BDFAF4B0FF',//倾斜摄影
          '26A2E41640223B909F3EAF8C3E11880C',
          '3D7E4151485286E3184AF0A15B35C988',
          '3D378F6140734B6EA6DA10AF135E47C5',
          'F1085241443B54131403E6B50778A59B',
        ])
        await addMarkerCamera()
      };
      let _onEvent = async (event) => {
        // console.log(event)
        let eventType = event.eventtype; //事件类型 参考交互事件类型枚举对象
        let id = event.Id; //图层id
        let objectId = event.ObjectID;
        let groupId = event.GroupID;
        let type = event.Type;
        let userData = event.UserData;
        let objectLocation = event.MouseClickPoint; //当前点击位置
        console.log(objectLocation)
        switch (eventType) {
          case "LeftMouseButtonClick": // 鼠标左键点击时触发方法
            if (this.addPlaneClip) {
              this.addPlaneClip = false
              await this.planeClip_event(objectLocation[0], objectLocation[1], objectLocation[2]);
              break;
            }
            break;
          default:
            break;
        }
      };
      let options = {
        //必选参数，网页显示视频流的dom节点id
        domId: "player",
        //必选参数，二次开发时必须指定，否则无法进行二次开发
        iid: this.instanceId,
        apiOptions: {
          //必选回调函数，视频流加载完成回调函数
          onReady: _onReady,
          //可选回调函数，视频流事件交互回调函数
          onEvent: _onEvent,
        },
        ui: {
          startupInfo: false, //默认值为true，初始化过程中是否显示左上角详细信息（如果不需要，直接去掉此属性即可）
          statusIndicator: false, //默认值为true，左上角闪烁的状态指示灯，可以从不同的颜色看出当前的状态
          statusButton: false, //默认值为false，是否在左下角显示信息按钮（如果不需要，直接去掉此属性即可）
          fullscreenButton: false, //默认值为false，是否在右下角显示全屏按钮（如果不需要，直接去掉此属性即可）
          homeButton: false, //默认值为false，是否在左下角显示“回到初始位置”按钮（如果不需要，直接去掉此属性即可）
          taskListBar: 1, //默认值为1，是否在下方显示“任务队列（API调用队列）”信息（0: 永不显示；1: 执行比较耗时的操作时显示；2: 一直显示）
          debugEventsPanel: false, //是否显示事件详细信息（仅用于调试）
          mainUI: false, //是否显示Cloud的UI工具栏，如果设置为true就显示，如果设置为false就隐藏，如果没有设置，就保持原状。
          campass: false, //是否显示指北针，如果设置为true就显示，如果设置为false就隐藏，如果没有设置，就保持原状。
        },
      };
      __g = new DigitalTwinPlayer(host, options).getAPI();
    },
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown);
    __g.destroy();
  },
  destroyed() {
    __g.destroy();
  },
};
</script>

<style lang="scss" scoped>
#content {
  width: 1920px;
  height: 1080px;
  transform-origin: 0 0;
  //display: flex;
}

#player {
  width: 1920px;
  height: 1080px;
}

#containerVr {
  width: 960px !important;
  height: 1080px !important;
}
</style>
<style lang="scss">
.mySelectStyle {
  transform: var(--primary-scale);
  transform-origin: 0 0;
}
</style>
