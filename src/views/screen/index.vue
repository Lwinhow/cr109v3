<template>
  <div id="content">
    <!-- 视频流 -->
    <div id="player"></div>
    <div>
      <!--  公共配置  -->
      <head-panle></head-panle>
      <head-menu></head-menu>
      <!--页面-->
      <content-panle-digital v-if="!$route.query.page" :hkwsArr="hkwsArr" :hkwsFlag1="hkwsFlag1" :hkwsFlag2="hkwsFlag2"
                             :hkwsIp.sync="hkwsIp" @login="loginHkws()"></content-panle-digital>
      <content-panle-alarm v-if="$route.query.page==='alarm'" ref="alarm" :hkwsArr="hkwsArr" :hkwsFlag1="hkwsFlag1"
                           :hkwsFlag2="hkwsFlag2"
                           :hkwsIp.sync="hkwsIp" @login="loginHkws()"></content-panle-alarm>
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
        <hkvs-box></hkvs-box>
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
import {addMarkerCamera, markerCamera} from "@/utils/marker";
import HkvsBox from "@/components/hkwsBox.vue";
import {getCameraAll} from "@/apis/getData";

export default {
  name: "Screen",
  components: {
    HkvsBox,
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
      title: null,
      videoFlag: false,
      hkwsArr: [],
      hkwsFlag1: false,
      hkwsFlag2: false,
      hkwsIp: null
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
    async loginHkws(index) {
      if (this.hkwsArr.length > 0) {
        for (let i = index; i < this.hkwsArr.length; i++) {
          let szIP = this.hkwsArr[i].ip,
              szPort = '80',
              szUsername = this.hkwsArr[i].username,
              szPassword = this.hkwsArr[i].password

          let szDeviceIdentify = szIP + "_" + szPort
          let _this = this
          await WebVideoCtrl.I_Login(szIP, 1, szPort, szUsername, szPassword, {
                timeout: 3000,
                success: function (xmlDoc) {
                  setTimeout(function () {
                    setTimeout(function () {
                      console.log('通道', i)
                      _this.getChannelInfo(szDeviceIdentify, i);
                    }, 1000);
                    console.log('端口', i)
                    _this.getDevicePort(szDeviceIdentify, i);
                  }, 10);
                },
                error: async function (oError) {
                  console.log('oError', oError)
                  await _this.loginHkws(i + 1)
                }
              }
          )
          ;
        }
      }
    },
    async sleep(ms) {
      // console.log(ms);
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    _getCameraAll() {
      getCameraAll().then(async res => {
        if (res) {
          this.hkwsArr = res
          await this.loginHkws(0)
        }
      }).catch(err => {
      })
    },
    getDevicePort(szDeviceIdentify, i) {
      let oPort = WebVideoCtrl.I_GetDevicePort(szDeviceIdentify).then((oPort) => {
        this.hkwsArr[i].deviceport = oPort.iDevicePort
        this.hkwsArr[i].rtspport = oPort.iRtspPort
        this.hkwsFlag2 = true
      }, (oError) => {
        console.log(oError)
      });
    },
    getChannelInfo(szDeviceIdentify, j) {
      let _this = this
      _this.hkwsArr[j].channels = []
      // 模拟通道
      WebVideoCtrl.I_GetAnalogChannelInfo(szDeviceIdentify, {
        success: function (xmlDoc) {
          let oChannels = $(xmlDoc).find("VideoInputChannel");
          for (let i = 0; i < oChannels.length; i++) {
            let id = $(oChannels[i]).find("id").eq(0).text(),
                name = $(oChannels[i]).find("name").eq(0).text();
            if ("" === name) {
              name = "Camera " + (i < 9 ? "0" + (i + 1) : (i + 1));
            }
            _this.hkwsArr[j].channels.push({
              id: id,
              name: name,
              bZero: false
            })
          }
          _this.hkwsFlag1 = true
        },
        error: function (oError) {
          console.log(oError)
        }
      });

      WebVideoCtrl.I_GetDigitalChannelInfo(szDeviceIdentify, {
        success: function (xmlDoc) {
          let oChannels = $(xmlDoc).find("InputProxyChannelStatus");
          for (let i = 0; i < oChannels.length; i++) {
            let id = $(oChannels[i]).find("id").eq(0).text(),
                name = $(oChannels[i]).find("name").eq(0).text();
            if ("" === name) {
              name = "Camera " + (i < 9 ? "0" + (i + 1) : (i + 1));
            }
            _this.hkwsArr[i].channels.push({
              id: id,
              name: name,
              bZero: false
            })
          }
        },
        error: function (oError) {
        }
      });
      // 零通道
      WebVideoCtrl.I_GetZeroChannelInfo(szDeviceIdentify, {
        success: function (xmlDoc) {
          let oChannels = $(xmlDoc).find("ZeroVideoChannel");
          for (let i = 0; i < oChannels.length; i++) {
            let id = $(oChannels[i]).find("id").eq(0).text(),
                name = $(oChannels[i]).find("name").eq(0).text();
            if ("" === name) {
              name = "Camera " + (i < 9 ? "0" + (i + 1) : (i + 1));
            }
            _this.hkwsArr[i].channels.push({
              id: id,
              name: name,
              bZero: false
            })
          }
        },
        error: function (oError) {
        }
      });
    },

    closeVideo() {
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
        __g.customObject.clear()
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
        __g.tileLayer.hideActors({
          id: '37A846BB400BB416C7E7E3983F2A5844',
          objectIds: [
            '155kZdrNL6AvS9JsGdEQD4',
            '155kZdrNL6AvS9JsGdEQD7',
            '155kZdrNL6AvS9JsGdEQD9',
            '155kZdrNL6AvS9JsGdEQD8',
            '155kZdrNL6AvS9JsGdEQDm',
            '155kZdrNL6AvS9JsGdEQDp',
            '155kZdrNL6AvS9JsGdEQDd',
            '155kZdrNL6AvS9JsGdEQDc',
            '155kZdrNL6AvS9JsGdEQDg',
            '155kZdrNL6AvS9JsGdEQIL',
            '155kZdrNL6AvS9JsGdEQIV',
            '155kZdrNL6AvS9JsGdEQIU',
            '155kZdrNL6AvS9JsGdEQIY',
            '155kZdrNL6AvS9JsGdEQIj',
            '3FQHZ745v0nRHNuL81MJpx',
            '3FQHZ745v0nRHNuL81MJpy',
            '3FQHZ745v0nRHNuL81MJdk',
            '3FQHZ745v0nRHNuL81MJdl',
            '3FQHZ745v0nRHNuL81MJcI',
            '3FQHZ745v0nRHNuL81MJcJ',
            '3FQHZ745v0nRHNuL81MJc6',
            '3FQHZ745v0nRHNuL81MJc7',
            '1YPnTiFCDA9B$BLjtbT74j',
            '1YPnTiFCDA9B$BLjtbT74Z',
            '1YPnTiFCDA9B$BLjtbT74m',
            '1YPnTiFCDA9B$BLjtbT74s',
            '1YPnTiFCDA9B$BLjtbT747',
            '1YPnTiFCDA9B$BLjtbT745',
            '1YPnTiFCDA9B$BLjtbT75g',
            '1YPnTiFCDA9B$BLjtbT75e',
            '1YPnTiFCDA9B$BLjtbT75$',
            '1YPnTiFCDA9B$BLjtbT75z',
            '1YPnTiFCDA9B$BLjtbT752',
            '1YPnTiFCDA9B$BLjtbT750',
            '1YPnTiFCDA9B$BLjtbT75H',
            '1YPnTiFCDA9B$BLjtbT75N',
            '00kBH4Rrn7JAArBcQwM1V4',
            '00kBH4Rrn7JAArBcQwM1VA',
            '00kBH4Rrn7JAArBcQwM1Uv',
            '00kBH4Rrn7JAArBcQwM1U$',
            '00kBH4Rrn7JAArBcQwM1Uk',
            '00kBH4Rrn7JAArBcQwM1Ui',
            '00kBH4Rrn7JAArBcQwM1U7',
            '00kBH4Rrn7JAArBcQwM1U5',
            '00kBH4Rrn7JAArBcQwM1Tw',
            '00kBH4Rrn7JAArBcQwM1Tu',
            '00kBH4Rrn7JAArBcQwM1TH',
            '00kBH4Rrn7JAArBcQwM1TN',
            '00kBH4Rrn7JAArBcQwM1T8',
            '00kBH4Rrn7JAArBcQwM1TE',
            '00kBH4Rrn7JAArBcQwM1Sy_RN',
            '00kBH4Rrn7JAArBcQwM1SY',
            '00kBH4Rrn7JAArBcQwM6ZD',
            '00kBH4Rrn7JAArBcQwM6Yp',
            '1F3CvCjNr8RBu2CqU7sP8o',
            '1F3CvCjNr8RBu2CqU7sP8m',
            '1F3CvCjNr8RBu2CqU7sPF5',
            '1F3CvCjNr8RBu2CqU7sPFR',
            '1F3CvCjNr8RBu2CqU7sPFk',
            '1F3CvCjNr8RBu2CqU7sPFi',
            '1F3CvCjNr8RBu2CqU7sPFm',
            '1F3CvCjNr8RBu2CqU7sPFs',
            '1F3CvCjNr8RBu2CqU7sP3V',
            '1F3CvCjNr8RBu2CqU7sP3T',
            '1xf4GVaRn0RvReoam42$8F',
            '1xf4GVaRn0RvReoam42$89',
            '1xf4GVaRn0RvReoam42$8M',
            '1xf4GVaRn0RvReoam42$8G',
            '1xf4GVaRn0RvReoam42$8Z_RN',
            '1xf4GVaRn0RvReoam42$8z',
            '1xf4GVaRn0RvReoam42$7E',
            '1xf4GVaRn0RvReoam42$78',
            '1xf4GVaRn0RvReoam42$7L',
            '1xf4GVaRn0RvReoam42$7N',
            '1xf4GVaRn0RvReoam42$7Y_RN',
            '1xf4GVaRn0RvReoam42$7y',
            '1xf4GVaRn0RvReoam42$6F',
            '1xf4GVaRn0RvReoam42$69',
            '1xf4GVaRn0RvReoam42$6M',
            '1xf4GVaRn0RvReoam42$6G',
            '1xf4GVaRn0RvReoam42$6r',
            '1xf4GVaRn0RvReoam42$6t',
            '2K9Mu3NMD4TBZUzEj4bMDG',
            '2K9Mu3NMD4TBZUzEj4bMDM',
            '2K9Mu3NMD4TBZUzEj4bMDK',
            '2K9Mu3NMD4TBZUzEj4bMDQ_RN',
            '2K9Mu3NMD4TBZUzEj4bMDO_RN',
            '2K9Mu3NMD4TBZUzEj4bMDU',
            '2K9Mu3NMD4TBZUzEj4bMDS',
            '2K9Mu3NMD4TBZUzEj4bMD2',
            '2K9Mu3NMD4TBZUzEj4bNGb',
            '2K9Mu3NMD4TBZUzEj4bNGh',
            '2K9Mu3NMD4TBZUzEj4bMr2',
            '2K9Mu3NMD4TBZUzEj4bMr0',
            '2K9Mu3NMD4TBZUzEj4bNGf',
            '2K9Mu3NMD4TBZUzEj4bNGl',
            '2K9Mu3NMD4TBZUzEj4bNGj',
            '2K9Mu3NMD4TBZUzEj4bNJJ',
            '2K9Mu3NMD4TBZUzEj4bNJV',
            '2K9Mu3NMD4TBZUzEj4bNJT',

            '0sz9L2W994Iwh4dFR171UA',
            '3U90S6ovHEDvqNbDFlaWXD',
            '1ZRa5rRrb7c9_kg_QHXtYV',
            '3CIRTrhLr2OgeEVowrB0FJ',
            '0fG0yQFA9FcAVEtPZL2Yvv',
            '04UwbgsHv5khlcT_7ELdKo',
            '2zs1xw1Jf0MucBZrpgMa42',
            '0sz9L2W994Iwh4dFR171UD_RN',
            '21U7DkRvX7SPYmS8cyClSI',
            '0sz9L2W994Iwh4dFR171U7',
            '1zkYEkDOX8bRbA3QW6Cmss',
            '3U90S6ovHEDvqNbDFlaWcD',
            '0sz9L2W994Iwh4dFR171Un',
            '1sA4OKQMz8mwtFIqYwF4io',
            '0sz9L2W994Iwh4dFR171Uu',
            '0sz9L2W994Iwh4dFR171Uq',
            '0sz9L2W994Iwh4dFR170XC',
            '0sz9L2W994Iwh4dFR171Sj',
            '0sz9L2W994Iwh4dFR171TU',
            '0sz9L2W994Iwh4dFR171TL',
            '0sz9L2W994Iwh4dFR171Ts',
            '0sz9L2W994Iwh4dFR171UK',
            '0sz9L2W994Iwh4dFR171UJ',
            '0sz9L2W994Iwh4dFR171Th',
            '0sz9L2W994Iwh4dFR171Uy',
            '0sz9L2W994Iwh4dFR171Ud',
            '0sz9L2W994Iwh4dFR170rB',
            '0sz9L2W994Iwh4dFR170Jn',
            '0sz9L2W994Iwh4dFR171TE',

            '0sz9L2W994Iwh4dFR171Nw',
            '0sz9L2W994Iwh4dFR171ND',
            '0sz9L2W994Iwh4dFR171Nt',
            '0sz9L2W994Iwh4dFR1714Q',
            '0sz9L2W994Iwh4dFR170xE',
            '0sz9L2W994Iwh4dFR170wz',
            '0sz9L2W994Iwh4dFR170wB',
            '0sz9L2W994Iwh4dFR170wH',
            '0sz9L2W994Iwh4dFR171H_',
            '0sz9L2W994Iwh4dFR171Hd',
            '0sz9L2W994Iwh4dFR171He',
            '0sz9L2W994Iwh4dFR171IP',
            '0sz9L2W994Iwh4dFR171LS',
            '1Xqx9LrTv6$A2lld3co40N',
            '0sz9L2W994Iwh4dFR1715Z',
            '0sz9L2W994Iwh4dFR171Iq',
            '1Xqx9LrTv6$A2lld3co4xB',
            '0sz9L2W994Iwh4dFR170I6',
            '2E7SgHKrv02v_aFgtbh53V',
            '0sz9L2W994Iwh4dFR171Jt',
            '0sz9L2W994Iwh4dFR171IX',
            '0i$$A$A613QQvmqeaJ8NI$',
            '0sz9L2W994Iwh4dFR171Jp',
            '3WVZzAPyf3OO6$tU8h6lkz',
            '2uw1RPx7H0ZBYuRNqVSBbK',
            '1AG3BOnkj8WAgJpXOT2UTz',
            '1OTOYVD7b919uKMIBcLB6p',
            '1OTOYVD7b919uKMIBcLB8m',
            '0c2x53$HH7UOEI1tovym_W',
            '3_uAOEkfT4WeIeT2AdYbC8',
            '3_uAOEkfT4WeIeT2AdYbAA',
            '0sz9L2W994Iwh4dFR171JF',
            '0sz9L2W994Iwh4dFR171J1',

            '3FQHZ745v0nRHNuL81MJpu',
            '3FQHZ745v0nRHNuL81MJpd',
            '3m0Xun4Lv8ReAhc_j3bzD6',
            '3m0Xun4Lv8ReAhc_j3bz2I',
            '1F3CvCjNr8RBu2CqU7sP35',
            '1F3CvCjNr8RBu2CqU7sPO0',
            '1F3CvCjNr8RBu2CqU7sP37',
            '1xf4GVaRn0RvReoam42$Oe',
            '1xf4GVaRn0RvReoam42$Og',
            '1xf4GVaRn0RvReoam42$Mb',
            '2K9Mu3NMD4TBZUzEj4bNHb',
            '2K9Mu3NMD4TBZUzEj4bNHl',
            '2K9Mu3NMD4TBZUzEj4bNVw',
            '2K9Mu3NMD4TBZUzEj4bMAG',
            '2K9Mu3NMD4TBZUzEj4bMAM',
            '3DxbkRl6jEce_D7ryz2BGx',
            '3DxbkRl6jEce_D7ryz2BT1',
            '1xf4GVaRn0RvReoam42$EC',
            '1xf4GVaRn0RvReoam42$Fo',
            '1xf4GVaRn0RvReoam42$Cn',
            '1xf4GVaRn0RvReoam42$Ct',
            '1F3CvCjNr8RBu2CqU7sP99',
            '1xf4GVaRn0RvReoam42$Cb',
            '1F3CvCjNr8RBu2CqU7sP3R',
            '1F3CvCjNr8RBu2CqU7sPLb',
            '1YPnTiFCDA9B$BLjtbT7AH',
            '1YPnTiFCDA9B$BLjtbT79R',
            '3FQHZ745v0nRHNuL81MJpw',
            '3FQHZ745v0nRHNuL81MJpv',
          ]
        })
        __g.customObject.addByTileLayer({
          id: 'zjmx1',
          tileLayerId: '37A846BB400BB416C7E7E3983F2A5844',
          objectId: [
            '155kZdrNL6AvS9JsGdEQD4',
            '155kZdrNL6AvS9JsGdEQD7',
            '155kZdrNL6AvS9JsGdEQD9',
            '155kZdrNL6AvS9JsGdEQD8',
            '155kZdrNL6AvS9JsGdEQDm',
            '155kZdrNL6AvS9JsGdEQDp',
            '155kZdrNL6AvS9JsGdEQDd',
            '155kZdrNL6AvS9JsGdEQDc',
            '155kZdrNL6AvS9JsGdEQDg',
            '155kZdrNL6AvS9JsGdEQIL',
            '155kZdrNL6AvS9JsGdEQIV',
            '155kZdrNL6AvS9JsGdEQIU',
            '155kZdrNL6AvS9JsGdEQIY',
            '155kZdrNL6AvS9JsGdEQIj',
            '3FQHZ745v0nRHNuL81MJpx',
            '3FQHZ745v0nRHNuL81MJpy',
            '3FQHZ745v0nRHNuL81MJdk',
            '3FQHZ745v0nRHNuL81MJdl',
            '3FQHZ745v0nRHNuL81MJcI',
            '3FQHZ745v0nRHNuL81MJcJ',
            '3FQHZ745v0nRHNuL81MJc6',
            '3FQHZ745v0nRHNuL81MJc7',
            '1YPnTiFCDA9B$BLjtbT74j',
            '1YPnTiFCDA9B$BLjtbT74Z',
            '1YPnTiFCDA9B$BLjtbT74m',
            '1YPnTiFCDA9B$BLjtbT74s',
            '1YPnTiFCDA9B$BLjtbT747',
            '1YPnTiFCDA9B$BLjtbT745',
            '1YPnTiFCDA9B$BLjtbT75g',
            '1YPnTiFCDA9B$BLjtbT75e',
            '1YPnTiFCDA9B$BLjtbT75$',
            '1YPnTiFCDA9B$BLjtbT75z',
            '1YPnTiFCDA9B$BLjtbT752',
            '1YPnTiFCDA9B$BLjtbT750',
            '1YPnTiFCDA9B$BLjtbT75H',
            '1YPnTiFCDA9B$BLjtbT75N',
            '00kBH4Rrn7JAArBcQwM1V4',
            '00kBH4Rrn7JAArBcQwM1VA',
            '00kBH4Rrn7JAArBcQwM1Uv',
            '00kBH4Rrn7JAArBcQwM1U$',
            '00kBH4Rrn7JAArBcQwM1Uk',
            '00kBH4Rrn7JAArBcQwM1Ui',
            '00kBH4Rrn7JAArBcQwM1U7',
            '00kBH4Rrn7JAArBcQwM1U5',
            '00kBH4Rrn7JAArBcQwM1Tw',
            '00kBH4Rrn7JAArBcQwM1Tu',
            '00kBH4Rrn7JAArBcQwM1TH',
            '00kBH4Rrn7JAArBcQwM1TN',
            '00kBH4Rrn7JAArBcQwM1T8',
            '00kBH4Rrn7JAArBcQwM1TE',
            '00kBH4Rrn7JAArBcQwM1Sy_RN',
            '00kBH4Rrn7JAArBcQwM1SY',
            '00kBH4Rrn7JAArBcQwM6ZD',
            '00kBH4Rrn7JAArBcQwM6Yp',
            '1F3CvCjNr8RBu2CqU7sP8o',
            '1F3CvCjNr8RBu2CqU7sP8m',
            '1F3CvCjNr8RBu2CqU7sPF5',
            '1F3CvCjNr8RBu2CqU7sPFR',
            '1F3CvCjNr8RBu2CqU7sPFk',
            '1F3CvCjNr8RBu2CqU7sPFi',
            '1F3CvCjNr8RBu2CqU7sPFm',
            '1F3CvCjNr8RBu2CqU7sPFs',
            '1F3CvCjNr8RBu2CqU7sP3V',
            '1F3CvCjNr8RBu2CqU7sP3T',
            '1xf4GVaRn0RvReoam42$8F',
            '1xf4GVaRn0RvReoam42$89',
            '1xf4GVaRn0RvReoam42$8M',
            '1xf4GVaRn0RvReoam42$8G',
            '1xf4GVaRn0RvReoam42$8Z_RN',
            '1xf4GVaRn0RvReoam42$8z',
            '1xf4GVaRn0RvReoam42$7E',
            '1xf4GVaRn0RvReoam42$78',
            '1xf4GVaRn0RvReoam42$7L',
            '1xf4GVaRn0RvReoam42$7N',
            '1xf4GVaRn0RvReoam42$7Y_RN',
            '1xf4GVaRn0RvReoam42$7y',
            '1xf4GVaRn0RvReoam42$6F',
            '1xf4GVaRn0RvReoam42$69',
            '1xf4GVaRn0RvReoam42$6M',
            '1xf4GVaRn0RvReoam42$6G',
            '1xf4GVaRn0RvReoam42$6r',
            '1xf4GVaRn0RvReoam42$6t',
            '2K9Mu3NMD4TBZUzEj4bMDG',
            '2K9Mu3NMD4TBZUzEj4bMDM',
            '2K9Mu3NMD4TBZUzEj4bMDK',
            '2K9Mu3NMD4TBZUzEj4bMDQ_RN',
            '2K9Mu3NMD4TBZUzEj4bMDO_RN',
            '2K9Mu3NMD4TBZUzEj4bMDU',
            '2K9Mu3NMD4TBZUzEj4bMDS',
            '2K9Mu3NMD4TBZUzEj4bMD2',
            '2K9Mu3NMD4TBZUzEj4bNGb',
            '2K9Mu3NMD4TBZUzEj4bNGh',
            '2K9Mu3NMD4TBZUzEj4bMr2',
            '2K9Mu3NMD4TBZUzEj4bMr0',
            '2K9Mu3NMD4TBZUzEj4bNGf',
            '2K9Mu3NMD4TBZUzEj4bNGl',
            '2K9Mu3NMD4TBZUzEj4bNGj',
            '2K9Mu3NMD4TBZUzEj4bNJJ',
            '2K9Mu3NMD4TBZUzEj4bNJV',
            '2K9Mu3NMD4TBZUzEj4bNJT',
          ],
          location: [],
          coordinateType: 0,
        })
        __g.customObject.addByTileLayer({
          id: 'zjmx2',
          tileLayerId: '37A846BB400BB416C7E7E3983F2A5844',
          objectId: [
            '0sz9L2W994Iwh4dFR171UA',
            '3U90S6ovHEDvqNbDFlaWXD',
            '1ZRa5rRrb7c9_kg_QHXtYV',
            '3CIRTrhLr2OgeEVowrB0FJ',
            '0fG0yQFA9FcAVEtPZL2Yvv',
            '04UwbgsHv5khlcT_7ELdKo',
            '2zs1xw1Jf0MucBZrpgMa42',
            '0sz9L2W994Iwh4dFR171UD_RN',
            '21U7DkRvX7SPYmS8cyClSI',
            '0sz9L2W994Iwh4dFR171U7',
            '1zkYEkDOX8bRbA3QW6Cmss',
            '3U90S6ovHEDvqNbDFlaWcD',
            '0sz9L2W994Iwh4dFR171Un',
            '1sA4OKQMz8mwtFIqYwF4io',
            '0sz9L2W994Iwh4dFR171Uu',
            '0sz9L2W994Iwh4dFR171Uq',
            '0sz9L2W994Iwh4dFR170XC',
            '0sz9L2W994Iwh4dFR171Sj',
            '0sz9L2W994Iwh4dFR171TU',
            '0sz9L2W994Iwh4dFR171TL',
            '0sz9L2W994Iwh4dFR171Ts',
            '0sz9L2W994Iwh4dFR171UK',
            '0sz9L2W994Iwh4dFR171UJ',
            '0sz9L2W994Iwh4dFR171Th',
            '0sz9L2W994Iwh4dFR171Uy',
            '0sz9L2W994Iwh4dFR171Ud',
            '0sz9L2W994Iwh4dFR170rB',
            '0sz9L2W994Iwh4dFR170Jn',
            '0sz9L2W994Iwh4dFR171TE',

            '0sz9L2W994Iwh4dFR171Nw',
            '0sz9L2W994Iwh4dFR171ND',
            '0sz9L2W994Iwh4dFR171Nt',
            '0sz9L2W994Iwh4dFR1714Q',
            '0sz9L2W994Iwh4dFR170xE',
            '0sz9L2W994Iwh4dFR170wz',
            '0sz9L2W994Iwh4dFR170wB',
            '0sz9L2W994Iwh4dFR170wH',
            '0sz9L2W994Iwh4dFR171H_',
            '0sz9L2W994Iwh4dFR171Hd',
            '0sz9L2W994Iwh4dFR171He',
            '0sz9L2W994Iwh4dFR171IP',
            '0sz9L2W994Iwh4dFR171LS',
            '1Xqx9LrTv6$A2lld3co40N',
            '0sz9L2W994Iwh4dFR1715Z',
            '0sz9L2W994Iwh4dFR171Iq',
            '1Xqx9LrTv6$A2lld3co4xB',
            '0sz9L2W994Iwh4dFR170I6',
            '2E7SgHKrv02v_aFgtbh53V',
            '0sz9L2W994Iwh4dFR171Jt',
            '0sz9L2W994Iwh4dFR171IX',
            '0i$$A$A613QQvmqeaJ8NI$',
            '0sz9L2W994Iwh4dFR171Jp',
            '3WVZzAPyf3OO6$tU8h6lkz',
            '2uw1RPx7H0ZBYuRNqVSBbK',
            '1AG3BOnkj8WAgJpXOT2UTz',
            '1OTOYVD7b919uKMIBcLB6p',
            '1OTOYVD7b919uKMIBcLB8m',
            '0c2x53$HH7UOEI1tovym_W',
            '3_uAOEkfT4WeIeT2AdYbC8',
            '3_uAOEkfT4WeIeT2AdYbAA',
            '0sz9L2W994Iwh4dFR171JF',
            '0sz9L2W994Iwh4dFR171J1',
          ],
          location: [],
          coordinateType: 0,
        })
        __g.customObject.addByTileLayer({
          id: 'zjmx3',
          tileLayerId: '37A846BB400BB416C7E7E3983F2A5844',
          objectId: [
            '3FQHZ745v0nRHNuL81MJpu',
            '3FQHZ745v0nRHNuL81MJpd',
            '3m0Xun4Lv8ReAhc_j3bzD6',
            '3m0Xun4Lv8ReAhc_j3bz2I',
            '1F3CvCjNr8RBu2CqU7sP35',
            '1F3CvCjNr8RBu2CqU7sPO0',
            '1F3CvCjNr8RBu2CqU7sP37',
            '1xf4GVaRn0RvReoam42$Oe',
            '1xf4GVaRn0RvReoam42$Og',
            '1xf4GVaRn0RvReoam42$Mb',
            '2K9Mu3NMD4TBZUzEj4bNHb',
            '2K9Mu3NMD4TBZUzEj4bNHl',
            '2K9Mu3NMD4TBZUzEj4bNVw',
            '2K9Mu3NMD4TBZUzEj4bMAG',
            '2K9Mu3NMD4TBZUzEj4bMAM',
            '3DxbkRl6jEce_D7ryz2BGx',
            '3DxbkRl6jEce_D7ryz2BT1',
            '1xf4GVaRn0RvReoam42$EC',
            '1xf4GVaRn0RvReoam42$Fo',
            '1xf4GVaRn0RvReoam42$Cn',
            '1xf4GVaRn0RvReoam42$Ct',
            '1F3CvCjNr8RBu2CqU7sP99',
            '1xf4GVaRn0RvReoam42$Cb',
            '1F3CvCjNr8RBu2CqU7sP3R',
            '1F3CvCjNr8RBu2CqU7sPLb',
            '1YPnTiFCDA9B$BLjtbT7AH',
            '1YPnTiFCDA9B$BLjtbT79R',
            '3FQHZ745v0nRHNuL81MJpw',
            '3FQHZ745v0nRHNuL81MJpv',
          ],
          location: [],
          coordinateType: 0,
        })
        __g.customObject.setTintColor('zjmx1', '#c71e1e')
        __g.customObject.setTintColor('zjmx2', '#f8c605')
        __g.customObject.setTintColor('zjmx3', '#9a8e8e')
        this._getCameraAll()
        if (this.$route.query.page === 'alarm') {
          await addMarkerCamera()
        }
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
              // if (markerCamera[userData].name) {
              // this.title = markerCamera[userData].name
              // this.videoFlag = true
              // this.clickStartRealPlay(1, markerCamera[userData].name)
              // }
              const index = this.hkwsArr.findIndex(item => item.ip === markerCamera[userData].ip);
              console.log(index, markerCamera[userData].name, markerCamera[userData].ip)
              if (this.hkwsArr[index].ip) {
                console.log(this.hkwsArr[index].ip)
                this.hkwsIp = this.hkwsArr[index].ip
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
}
;
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
