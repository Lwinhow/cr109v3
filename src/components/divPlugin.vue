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
      loginIp: '10.5.4.211',
      port: '554',
      username: 'admin',
      password: 'P@ssw0rd',
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

      WebVideoCtrl.I_Login(szIP, szProtoType, szPort, szUsername, szPassword, {
        timeout: 3000,
        success: function (xmlDoc) {
          // setTimeout(function () {
          //   setTimeout(function () {
          //     getChannelInfo();
          //   }, 1000);
          //   this.getDevicePort();
          // }, 10);
          console.log(3)
        },
        error: function (oError) {
          console.log(1,oError)
        }
      });
    },
    getChannelInfo() {
      let szDeviceIdentify = this.ip,
          oSel = this.channels = []

      // 模拟通道
      WebVideoCtrl.I_GetAnalogChannelInfo(szDeviceIdentify, {
        success: function (xmlDoc) {
          let oChannels = $(xmlDoc).find("VideoInputChannel");

          for (let i = 0; i < oChannels.length; i++) {
            let id = $(oChannels[i]).find("id").eq(0).text(),
                name = $(oChannels[i]).find("name").eq(0).text();
            if ("" == name) {
              name = "Camera " + (i < 9 ? "0" + (i + 1) : (i + 1));
            }
            oSel.push({
              id: id,
              name: name,
              bZero: false
            })
          }
        },
        error: function (oError) {
          console.log(oError)
        }
      });
      // 数字通道
      WebVideoCtrl.I_GetDigitalChannelInfo(szDeviceIdentify, {
        success: function (xmlDoc) {
          let oChannels = $(xmlDoc).find("InputProxyChannelStatus");

          for (let i = 0; i < oChannels.length; i++) {
            let id = $(oChannels[i]).find("id").eq(0).text(),
                name = $(oChannels[i]).find("name").eq(0).text(),
                online = $(oChannels[i]).find("online").eq(0).text();
            if ("false" == online) { // 过滤禁用的数字通道
              continue;
            }
            if ("" == name) {
              name = "IPCamera " + (i < 9 ? "0" + (i + 1) : (i + 1));
            }
            oSel.push({
              id: id,
              name: name,
              bZero: false
            })
          }
        },
        error: function (oError) {
          console.log(oError)
        }
      });
      // 零通道
      WebVideoCtrl.I_GetZeroChannelInfo(szDeviceIdentify, {
        success: function (xmlDoc) {
          let oChannels = $(xmlDoc).find("ZeroVideoChannel");

          for (let i = 0; i < oChannels.length; i++) {
            let id = $(oChannels[i]).find("id").eq(0).text(),
                name = $(oChannels[i]).find("name").eq(0).text();
            if ("" == name) {
              name = "Camera " + (i < 9 ? "0" + (i + 1) : (i + 1));
            }
            oSel.push({
              id: id,
              name: name,
              bZero: false
            })
          }

        },
        error: function (oError) {
          console.log(oError)
        }
      });
    },
    getDevicePort() {
      let szDeviceIdentify = this.ip
      let oPort = WebVideoCtrl.I_GetDevicePort(szDeviceIdentify).then((oPort) => {
        this.deviceport = oPort.iDevicePort
        this.rtspport = oPort.iRtspPort
      }, (oError) => {
        console.log(oError)
      });
    },
    clickStartRealPlay(iStreamType) {
      let oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
          szDeviceIdentify = this.ip,
          iRtspPort = parseInt(this.rtspport, 10),
          iChannelID = parseInt(this.channels, 10),
          bZeroChannel = this.getBZeroChannel(),
          szInfo = "";

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