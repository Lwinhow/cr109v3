<template>
  <div class="videoBox">
    <video ref="video" autoplay="autoplay" controls="controls" loop muted
           style="width:100%; height:100%; object-fit: fill;"></video>
  </div>
</template>

<script>
export default {
  name: 'hlsVideo',
  data() {
    return {
      HlsPlayer: null,
    };
  },
  props: {
    hkwsCode: {
      type: String,
      default: ""
    }
  },
  watch: {
    hkwsCode: {
      handler: function (newVal, oldVal) {
        if (newVal) {
          this.init();
        }
      },
      deep: true,
      immediate: true
    }
  },
  destroyed() {
    if (this.HlsPlayer) {
      this.HlsPlayer.destroy();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      /* getCameraUrl({
        cameraId: this.hkwsCode
      }).then(res => { */
      this.$nextTick(() => {
        if (Hls.isSupported()) {
          console.log("视频加载中。。。。。。")
          let wanUrl = this.hkwsCode;
          this.HlsPlayer = new Hls();
          this.HlsPlayer.loadSource(wanUrl);
          this.HlsPlayer.attachMedia(this.$refs.video);
          this.HlsPlayer.on(Hls.Events.MANIFEST_PARSED, function () {
            this.$refs.video.play();
          });
        } else if (this.$refs.video.canPlayType("application/vnd.apple.mpegurl")) {
          this.$refs.video.src = wanUrl;
          this.$refs.video.addEventListener("loadedmetadata", function () {
            this.$refs.video.play();
          });
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.videoBox {
  width: 100%;
  height: 100%;
}
</style>