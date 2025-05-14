<template>
  <div class="right-menu">
    <div class="right-menu-time">
      <el-slider
          v-model="timeValue"
          :marks="timeMarks"
          :max="24"
          :show-tooltip="false"
          height="180px"
          vertical
          @input="setTime"
      >
      </el-slider>
      <div class="time-title">Time</div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "RightMenu",
  data() {
    return {
      timeValue: 12,
    };
  },
  computed: {
    timeMarks() {
      let obj = {
        0: '0.00',
        24: '24.00',
      };
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.$set(obj, this.timeValue, {
        label: this.$createElement('div', {class: 'time-current-label'}, `${this.timeValue}.00`)
      })
      return obj
    },
  },
  methods: {
    async setTime() {
      let date = new Date(); //当前时间
      switch (this.timeValue) {
        case 0:
          __g.weather.setDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), 0, 0, false);
          break;
        case 1:
          __g.weather.setDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), 1, 0, false);
          break;
        case 2:
        case 3:
          __g.weather.setDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), 3, 0, false);
          break;
        case 4:
        case 5:
          __g.weather.setDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), 5, 0, false);
          break;
        case 6:
        case 7:
          __g.weather.setDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), 7, 0, false);
          break;
        case 8:
        case 9:
          __g.weather.setDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), 9, 0, false);
          break;
        case 10:
        case 11:
          __g.weather.setDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), 11, 0, false);
          break;
        case 12:
          break;
        case 13:
          __g.weather.setDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), 13, 0, false);
          break;
        case 14:
        case 15:
          __g.weather.setDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), 15, 0, false);
          break;
        case 16:
        case 17:
          __g.weather.setDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), 17, 0, false);
          break;
        case 18:
        case 19:
          __g.weather.setDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), 19, 0, false);
          break;
        case 20:
        case 21:
          __g.weather.setDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), 21, 0, false);
          break;
        case 22:
        case 23:
          __g.weather.setDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), 23, 0, false);
          break;
        case 24:
          __g.weather.setDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), 24, 0, false);
          break;
        default:
          break;
      }
    },
    async sleep(ms) {
      console.log(ms);
      return new Promise(resolve => setTimeout(resolve, ms));
    },
  },
}
;
</script>
<style lang="scss" scoped>
.right-menu {
  display: flow;

  .right-menu-time {
    position: fixed;
    right: 50px;
    bottom: 100px;
    z-index: 6;

    .time-title {
      margin-top: 15px;
      color: #ffffff;
      font-size: 14px;
    }

    .time-current-label {
      width: 46px;
      height: 20px;
      line-height: 22px;
      padding: 0 6px 0 0;
      text-align: center;
      background: url('@/assets/screenimages/screen-time-bg.png') center 0 no-repeat;
      background-size: auto 100%;
      color: #ffffff;
      font-size: 13px;
      overflow: hidden;
    }
  }
}
</style>
<style lang="scss">
.right-menu {
  .el-slider.is-vertical .el-slider__bar {
    width: 8px;
    border: 0;
    background: #008CFF;
  }

  .el-slider.is-vertical .el-slider__runway {
    width: 8px;
    border: 0;
    background: rgba(0, 140, 255, 0.4);
  }

  .el-slider.is-vertical .el-slider__marks-text {
    right: 15px;
    left: auto;
    color: #7BBCE6;
  }

  .el-slider__stop {
    display: none;
  }

  .el-slider__button {
    border-radius: 0;
    height: 4px;
    width: 14px;
    border: 0;
  }

  .el-slider.is-vertical .el-slider__button-wrapper {
    left: -14px;
  }
}
</style>