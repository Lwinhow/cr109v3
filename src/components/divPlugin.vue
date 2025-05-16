<template>
  <div id='hkvs'>
    <el-button @click="clickLogin(1)">登录</el-button>
    <el-button>退出</el-button>
    <el-button @click="clickStartRealPlay(1)">播放</el-button>
    <div id='divPlugin' class="plugin"></div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'divPlugin',
  data() {
    return {
      loginIp: '192.168.10.119',
      port: '80',
      username: 'admin',
      password: 'light12345',
      ip: "",
      deviceport: null,
      rtspport: null,
      channels: [],
      selectedChannel: null,
    }
  },
  methods: {
    getBZeroChannel() {
      const selectedOption = this.channels.find(
          option => option.id === this.selectedChannel
      );
      return selectedOption ? selectedOption.bZero : false;
    },
    clickLogin(szProtoType) {
      let szIP = this.loginIp,
          szPort = this.port,
          szUsername = this.username,
          szPassword = this.password

      this.ip = szIP + "_" + szPort
      let _this = this
      WebVideoCtrl.I_Login(szIP, szProtoType, szPort, szUsername, szPassword, {
        timeout: 3000,
        success: function (xmlDoc) {
          setTimeout(function () {
            setTimeout(function () {
              _this.getChannelInfo();
            }, 1000);
            _this.getDevicePort();
          }, 10);
        },
        error: function (oError) {
          console.log('oError', oError)
        }
      });
    },
    getChannelInfo() {
      let _this = this
      let szDeviceIdentify = this.ip

      // 模拟通道
      WebVideoCtrl.I_GetAnalogChannelInfo(szDeviceIdentify, {
        success: function (xmlDoc) {
          console.log(xmlDoc, 111)
          let oChannels = $(xmlDoc).find("VideoInputChannel");

          for (let i = 0; i < oChannels.length; i++) {
            let id = $(oChannels[i]).find("id").eq(0).text(),
                name = $(oChannels[i]).find("name").eq(0).text();
            if ("" === name) {
              name = "Camera " + (i < 9 ? "0" + (i + 1) : (i + 1));
            }
            _this.channels.push({
              id: id,
              name: name,
              bZero: false
            })
          }
          console.log(_this.channels)
        },
        error: function (oError) {
          console.log(oError)
        }
      });
    },
    getDevicePort() {
      console.log(4, this.ip)
      let oPort = WebVideoCtrl.I_GetDevicePort(this.ip).then((oPort) => {
        this.deviceport = oPort.iDevicePort
        this.rtspport = oPort.iRtspPort
        console.log(this.deviceport, this.rtspport)
      }, (oError) => {
        console.log(oError)
      });

    },
    clickStartRealPlay(iStreamType) {
      let _this = this
      let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
          szDeviceIdentify = _this.ip,
          iRtspPort = parseInt(_this.rtspport, 10),
          iChannelID = parseInt(_this.channels[0].id, 10),
          bZeroChannel = _this.getBZeroChannel(),
          szInfo = "";
      console.log(oWndInfo, szDeviceIdentify, iRtspPort, iChannelID, bZeroChannel)

      if ("undefined" === typeof iStreamType) {
        iStreamType = 1
      }

      let startRealPlay = function () {
        WebVideoCtrl.I_StartRealPlay(szDeviceIdentify, {
          iStreamType: iStreamType,
          iChannelID: iChannelID,
          bZeroChannel: bZeroChannel,
          iPort: iRtspPort,
          success: function () {
            console.log(1);
          },
          error: function (oError) {
            console.log(2);
          }
        });
      };

      if (oWndInfo != null) {// 已经在播放了，先停止
        WebVideoCtrl.I_Stop({
          success: function () {
            startRealPlay();
          }
        });
      } else {
        startRealPlay();
      }
    },
  },
  mounted() {
    // this.clickLogin(1)
    // this.clickStartRealPlay(1)
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
.plugin {
  position: absolute;
  top: 100px;
  width: 500px;
  height: 300px;
  background-color: #00B7FF;
}
</style>
<style lang="scss">
</style>