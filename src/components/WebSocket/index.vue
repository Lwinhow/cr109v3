<template>
  <audio ref="audio" controls="controls" hidden src="@/assets/MP3/alarm.wav"></audio>
</template>

<script>
import config from '@/utils/config.js';

export default {
  data() {
    return {
      websockNet: null, //ws实例
      wssIsConnected: false, //是否在连接
      wsTimer: null,//ws定时器
      wsParams: { //ws参数
        tenantId: "HYC",
        pushType: "HEART"
      },
      wssErrorOccurred: false,
    }
  },
  watch: {},
  mounted() {
    this.initWebSocketNet();
  },
  destroyed() {
    // 清除定时器
    clearInterval(this.wsTimer);
    this.wsTimer = null;
    //离开路由之后断开websocket连接
    if (this.websockNet) {
      this.websockNet.close();
    }
  },
  methods: {
    //初始化Websocket--net_info
    initWebSocketNet() {
      if (typeof WebSocket === "undefined") {
        return console.log("您的浏览器不支持websocket");
      }
      if (this.websockNet === undefined || !this.wssIsConnected) {
        if (!this.$store.getters.token) {
          return
        }
        let wsUrl = `${config[process.env.NODE_ENV].wsUrl}${this.$store.getters.token}`
        this.websockNet = new WebSocket(wsUrl);
        this.websockNet.onmessage = this.websocketonmessageNet;
        this.websockNet.onopen = this.websocketonopenNet;
        this.websockNet.onerror = this.websocketonerrorNet;
        this.websockNet.onclose = this.websocketcloseNet;
      }
    },
    // 链接建立之后执行send方法发送数据
    websocketonopenNet() {
      try {
        this.heartCheck();
      } catch (err) {
      }
      this.wssIsConnected = true;
    },
    websocketonmessageNet(e) {
      try {
        if (e.data.indexOf("【连接成功】") >= 0) {
          //layer.msg("消息服务已连接！<br><br>", {icon: 1, time: 2000});
        } else {

        }
      } catch (err) {
      }
    },
    // 报错
    websocketonerrorNet(e) {
      this.$message({
        duration: 5000,
        showClose: true,
        message: "消息服务连接异常：" + e.message + "！",
        type: 'error'
      })
      this.wssErrorOccurred = true;
    },
    //关闭
    websocketcloseNet(e) {
      try {
        clearInterval(this.wsTimer);
        this.wsTimer = null;
        if (!this.wssErrorOccurred && this.$store.getters.token) {
          if (e.reason != undefined && e.reason != '') {
            this.$message({
              duration: 5000,
              showClose: true,
              message: e.reason + "，开始自动重连...",
              type: 'error'
            })
          } else {
            this.$message({
              duration: 5000,
              showClose: true,
              message: "服务连接已关闭，开始自动重连...",
              type: 'error'
            })
          }
        }
      } catch (err) {
      } finally {
        this.wssErrorOccurred = false;
        this.wssIsConnected = false;
        this.initWebSocketNet();
      }
    },
    // 定时发一次心跳
    heartCheck() {
      const _this = this;
      _this.wsTimer = setInterval(function () {
        if (_this.websockNet) {
          _this.websockNet.send(JSON.stringify(_this.wsParams));
        }
      }, 30 * 1000);
    },
  }
}
</script>

<style lang="scss">
.ws-msg-img {
  display: block;
  width: 350px;
  margin: 10px 10px 0 0;
  padding: 0;
  overflow: hidden;
}

.ws-msg-text {
  width: 100%;
  margin: 10px 10px 0 0;
  font-size: 12px;
  line-height: 18px;
  color: #606266;
  overflow: hidden;
}
</style>