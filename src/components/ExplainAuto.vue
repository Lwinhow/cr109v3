<template>
  <div id='ExplainAuto'>
    <div class="explain-auto-box">
      <div class="explain-auto" @click="playAnimation">自动漫游/讲解</div>
      <div v-if="playAnimation_flag" class="explain-auto-p-r">
        <div v-if="playAnimation_flag&&!pauseAnimation_flag" class="pause" @click="pauseAnimation"></div>
        <div v-if="playAnimation_flag&&pauseAnimation_flag" class="play" @click="resumeAnimation"></div>
      </div>
      <div class="explain-auto-audio">
        <audio ref="audio" controls="controls" src="../assets/MP3/1.mp3"></audio>
      </div>
    </div>
    <div class="text"></div>
    <div v-if="playMp4" class="videoPlay">
      <div class="videoBox">
        <div class="icon" @click="closeVideo">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <video ref="videoPlayer" controls>
        <source src="../assets/MP4/202505111543.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'ExplainAuto',
  data() {
    return {
      sleepIndex: 0,
      homePage_flag: true,
      playAnimation_flag: false,
      pauseAnimation_flag: false,
      maxIndex: 135,
      playMp4: false,
    }
  },
  mounted() {
  },
  created() {
  },
  methods: {
    async sleep(ms) {
      // console.log(ms);
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async test() {
      while (this.sleepIndex < this.maxIndex) {
        if (!this.pauseAnimation_flag && this.playAnimation_flag) {
          this.sleepIndex++;
          console.log(this.sleepIndex)
          await this.sleep(1000);
          if (this.sleepIndex === 25) {
            __g.infoTree.show('C010BA13489E0704A9415B8B10B9671B')
          } else if (this.sleepIndex === 9) {
            __g.tileLayer.setStyle('3EC1C1A94AA9071D0C1D0BB748998572', 1)
          } else if (this.sleepIndex === 18) {
            __g.tileLayer.setStyle('3EC1C1A94AA9071D0C1D0BB748998572', 0)
          } else if (this.sleepIndex === 29) {
            __g.infoTree.hide('C010BA13489E0704A9415B8B10B9671B')
          } else if (this.sleepIndex === 30) {
            __g.camera.playAnimation(2);
          } else if (this.sleepIndex === 48) {
            __g.camera.playAnimation(3);
          } else if (this.sleepIndex === 56) {
            __g.infoTree.hide("2C62585F491514A6C0BD729D39BA3B55")
          } else if (this.sleepIndex === 63) {
            __g.camera.playAnimation(4);
          } else if (this.sleepIndex === 80) {
            __g.camera.playAnimation(5);
          } else if (this.sleepIndex === 85) {
            let bbox = [-1311607.25, 157589.1884082079, -64.23667844295503, -1311491.125, 157621.99713866712, 23.131488013267518]
            fdapi.tools.startVolumeClip(bbox, 0, false, false, [0, 0, 0]);
          } else if (this.sleepIndex === 91) {
            __g.tools.stopVolumeClip();
            __g.tileLayer.showAllActors()
            __g.camera.playAnimation(10);
          } else if (this.sleepIndex === 101) {
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
              ]
            })
            __g.camera.playAnimation(9);
          } else if (this.sleepIndex === 134) {
            await this.playVideo()
          }
        } else {
          return 0
        }
      }
      this.rePayAnimation()
    },
    pauseAnimation() {
      if (!this.pauseAnimation_flag) {
        this.pauseAnimation_flag = true
        this.$refs.audio.pause();
        if (this.sleepIndex < this.maxIndex) {
          __g.camera.pauseAnimation()
        } else {
          this.rePayAnimation()
        }
      } else {
        console.log('?')
      }
    },
    resumeAnimation() {
      if (this.pauseAnimation_flag) {
        this.pauseAnimation_flag = false
        this.$refs.audio.play();
        if (this.sleepIndex < this.maxIndex) {
          __g.camera.resumeAnimation()
          this.test()
        } else {
          this.rePayAnimation()
        }
      } else {
        console.log('?')
      }
    },

    closeVideo() {
      this.playMp4 = false
    },
    async playVideo() {
      this.playMp4 = true
      await this.sleep(1000)
      const video = this.$refs.videoPlayer;
      try {
        await video.play();
        if (video.requestFullscreen) {
          await video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { // Firefox
          video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { // Chrome, Safari and Opera
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // IE/Edge
          video.msRequestFullscreen();
        }
      } catch (error) {
        console.error('全屏播放失败:', error);
      }
    },
    rePayAnimation() {
      this.sleepIndex = this.maxIndex + 2
      this.playAnimation_flag = false
      this.pauseAnimation_flag = false
      __g.camera.stopAnimation();
      __g.tools.stopVolumeClip();
      this.$refs.audio.pause();
      this.$refs.audio.currentTime = 0;
      console.log('漫游停止')
    },
    async playAnimation() {
      this.playAnimation_flag = !this.playAnimation_flag
      if (this.playAnimation_flag) {
        __g.camera.playAnimation(1);
        await this.$refs.audio.play();
        this.sleepIndex = 0
        while (this.sleepIndex < this.maxIndex) {
          if (!this.pauseAnimation_flag && this.playAnimation_flag) {
            this.sleepIndex++;
            console.log(this.sleepIndex)
            await this.sleep(1000);
            if (this.sleepIndex === 25) {
              __g.infoTree.show('C010BA13489E0704A9415B8B10B9671B')
            } else if (this.sleepIndex === 9) {
              __g.tileLayer.setStyle('3EC1C1A94AA9071D0C1D0BB748998572', 1)
            } else if (this.sleepIndex === 18) {
              __g.tileLayer.setStyle('3EC1C1A94AA9071D0C1D0BB748998572', 0)
            } else if (this.sleepIndex === 29) {
              __g.infoTree.hide('C010BA13489E0704A9415B8B10B9671B')
            } else if (this.sleepIndex === 30) {
              __g.camera.playAnimation(2);
            } else if (this.sleepIndex === 48) {
              __g.camera.playAnimation(3);
            } else if (this.sleepIndex === 56) {
              __g.infoTree.hide("2C62585F491514A6C0BD729D39BA3B55")
            } else if (this.sleepIndex === 63) {
              __g.camera.playAnimation(4);
            } else if (this.sleepIndex === 80) {
              __g.camera.playAnimation(5);
            } else if (this.sleepIndex === 85) {
              let bbox = [-1311607.25, 157589.1884082079, -64.23667844295503, -1311491.125, 157621.99713866712, 23.131488013267518]
              fdapi.tools.startVolumeClip(bbox, 0, false, false, [0, 0, 0]);
            } else if (this.sleepIndex === 91) {
              __g.tools.stopVolumeClip();
              __g.tileLayer.showAllActors([
                '6F131A6E44FC74C00A89DB85C75F348F',
                '2929EE0F4E3B5DBC106A5E84D5A11CF7'
              ])
              __g.camera.playAnimation(10);
            } else if (this.sleepIndex === 101) {
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
                ]
              })
              __g.camera.playAnimation(9);
            } else if (this.sleepIndex === 134) {
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
              await this.playVideo()
            }
          } else {
            return 0
          }
        }
        this.rePayAnimation()
      } else {
        this.rePayAnimation()
      }
    },
  },

}
</script>
<style lang="scss" scoped>
.explain-auto-box {
  .explain-auto {
    position: fixed;
    right: 250px;
    top: 0;
    z-index: 6;
    width: 100px;
    height: 80px;
    background: url('@/assets/screenimages/screen-menu-btn3.png') 0 0 no-repeat;
    background-size: 100% auto;
    cursor: pointer;
    padding: 50px 0 0 0;
    text-align: center;
    font-size: 13px;
    line-height: 26px;
    color: #ffffff;
    overflow: hidden;
  }

  .explain-auto-p-r {
    position: fixed;
    right: 270px;
    top: 70px;
    z-index: 6;
    cursor: pointer;
    text-align: center;
    font-size: 24px;
    line-height: 26px;
    overflow: hidden;
    padding: 5px;

    .pause {
      background: url('@/assets/images/暂停.png') center center no-repeat;
      background-size: 40px 40px;
      width: 45px;
      height: 45px;
      color: #46a6ff
    }

    .play {
      background: url('@/assets/images/播放.png') center center no-repeat;
      background-size: 40px 40px;
      width: 45px;
      height: 45px;
      color: #46a6ff
    }
  }

  .explain-auto-audio {
    opacity: 0;
  }
}

.videoPlay {
  width: 1400px;
  height: 817px;
  position: absolute;
  left: 260px;
  top: 160px;
  z-index: 9;
  border-radius: 20px;

  .videoBox {
    width: 1400px;
    height: 30px;
    background-color: #1568be;
    border-radius: 5px 5px 0 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;

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

  video {
    width: 1400px;
    height: 787px;
  }
}
</style>
<style lang="scss">
</style>