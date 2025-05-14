<template>
  <div id="content">
    <!-- 视频流 -->
    <div id="player"></div>
    <div v-if="flag">
      <!--  公共配置  -->
      <head-panle></head-panle>
      <head-menu></head-menu>
      <!--页面-->
      <content-panle-digital v-if="!$route.query.page"></content-panle-digital>
      <content-panle-alarm v-if="$route.query.page==='alarm'"></content-panle-alarm>
      <content-panle-scenario v-if="$route.query.page==='scenario'" ref="scenario"></content-panle-scenario>
      <explain-auto></explain-auto>
    </div>
    <div v-if="videoFlag" class="videoBody">
      <div class="title">
        <span>{{ title }}</span>
        <div class="icon" @click="closeVideo">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="video">
        <hls-video :hkwsCode="hkwsUrl"></hls-video>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import config from "@/utils/config.js";
import HeadPanle from "@/views/screen/view/HeadPanle.vue";
import HeadMenu from "@/views/screen/view/HeadMenu.vue";
import ContentPanleDigital from "@/views/screen/view/ContentPanleDigital.vue";
import ContentPanleAlarm from "@/views/screen/view/ContentPanleAlarm.vue";
import ContentPanleScenario from "@/views/screen/view/ContentPanleScenario.vue";
import ExplainAuto from "@/components/ExplainAuto.vue";
import HlsVideo from "@/components/HlsVideo.vue";
import {getCameraUrl} from "@/apis/getData";
import {markerCamera} from "@/utils/marker";

export default {
  name: "Screen",
  components: {
    HlsVideo,
    ExplainAuto,
    ContentPanleScenario,
    ContentPanleAlarm,
    ContentPanleDigital,
    HeadMenu,
    HeadPanle
  },
  data() {
    return {
      instanceId: config[process.env.NODE_ENV].playerExampleId, //实例id
      addPlaneClip: false,
      flag: false,
      hkwsUrl: null,
      title: null,
      videoFlag: false
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
    _getHkwsUrl(id) {
      getCameraUrl({
        stream: id
      }).then(res => {
        if (res) {
          this.hkwsUrl = res.url
        }
      }).catch(err => {
      })
    },
    closeVideo() {
      this.hkwsUrl = null
      this.videoFlag = false
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
        this.flag = true
        __g.camera.set([-1311493.58875, 157033.471719, 574.008711, -45.003574, -99.802147, 3])
        __g.marker.clear()
        __g.camera.stopAnimation()
        __g.tools.stopPlaneClip();
        __g.tools.stopVolumeClip();
        __g.infoTree.hide([
          'F6ABC22442B91B5EF7C740BAE23991BA',//商场模型
          'FBE4932F4A31B2BEE5955B835E017551',//结构模型
          '2FBB0F894CFD2ECF697760A7DCA61969',//项目模型
          '349280C44403CF4FA47257999931BEF5',//工程走向
          'C010BA13489E0704A9415B8B10B9671B',
          'F0CD9D044374CF7D5CE36A9EF14A61E5',
          '32861C9A4457CC78A01B3E8BEC224D76',
          '6433422F4DEC29AE77FE98BD968309AA',
          'C384DB1C41C1AD0E2219D68BA931D25E',
        ])
        __g.infoTree.show([
          '9561C9FE4B3F953060DA20993729C110',//在建
          'F762F9024430C36142D448BDFAF4B0FF',//倾斜摄影
          '26A2E41640223B909F3EAF8C3E11880C',
          '3D7E4151485286E3184AF0A15B35C988',
          '3D378F6140734B6EA6DA10AF135E47C5',
          'F1085241443B54131403E6B50778A59B',
        ])
        __g.tileLayer.hideActors({
          id: '6F131A6E44FC74C00A89DB85C75F348F',
          objectIds: [
            '3mV$bRpMjGjht$IScT9Dpb',
            '134JEIq4YG4im5bKeqZ3pJ',
          ]
        })
        __g.tileLayer.hideActors({
          id: '2929EE0F4E3B5DBC106A5E84D5A11CF7',
          objectIds: [
            '1b2LVM2n49_sCqbWJHFhS$',
            '0mtLUR_lqO6dSzIpY61rEU',
            '0QePe94mzzuzNlBJbwzKEi'
          ]
        })
      };
      let _onEvent = async (event) => {
        console.log(event)
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
            if (type === 'marker' && userData) {
              if (markerCamera[userData].id) {
                this.title = markerCamera[userData].name
                this.videoFlag = true
                this._getHkwsUrl(markerCamera[userData].id)
              }
              if (markerCamera[userData].camera) {
                __g.camera.set(markerCamera[userData].camera)
              } else {
                __g.marker.focus(id)
              }
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
}

#player {
  width: 100%;
  height: 100%;
}

.videoBody {
  position: fixed;
  padding: 5px 15px 15px 15px;
  z-index: 1000;
  left: 555px;
  top: 280px;
  background-image: radial-gradient(circle at 50% 2.8%, #2E5C88 0%, rgba(33, 65, 97, 0.85) 56%, rgba(33, 49, 70, 0.95) 107%);
  border-radius: 8px;
  width: 800px;
  height: 650px;

  .title {
    width: 100%;
    height: 30px;
    color: #FFFFFF;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      line-height: 30px;
      letter-spacing: 2px;
    }

    .icon {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #a5a9ae;
    }

    .icon:hover {
      border-radius: 0 5px 0 0;
      background-color: #c71e1e;
      color: #FFFFFF;
    }
  }

  .video {
    width: 100%;
    height: 600px;
  }
}
</style>
<style lang="scss">
.mySelectStyle {
  transform: var(--primary-scale);
  transform-origin: 0 0;
}
</style>
