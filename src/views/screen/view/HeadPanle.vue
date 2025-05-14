<template>
  <div class="head-bottom-panle">
    <!-- 左右上下边阴影 -->
    <div v-show="$route.query.page!=='scenario'" class="left-shadow"></div>
    <div v-show="$route.query.page!=='scenario'" class="right-shadow"></div>
    <div class="top-shadow"></div>
    <div class="bottom-shadow"></div>
    <!-- 头部底部内容 -->
    <div class="head-panle">
      <div class="head-panle-ct-m">CROSS ISLAND LINE 109</div>
      <div class="head-panle-ct-l">
        <div class="ct-l1"></div>
        <div class="ct-l2"></div>
        <div class="ct-l3"></div>
      </div>
      <div v-show="$route.query.page!=='scenario'" class="head-panle-ct-r">
        <div class="ct-r3" @click="toSandBox"></div>
        <div class="ct-r2"></div>
        <div class="ct-r1" @click="refreshClick"></div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="bottom-panle"></div>
  </div>
</template>

<script>
export default {
  name: "HeadPanle",
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
    toSandBox() {
      __g.camera.set([-1311493.58875, 157033.471719, 574.008711, -45.003574, -99.802147, 3])
    },
    refreshClick() {
      location.reload()
    },
  },
}
;
</script>

<style lang="scss" scoped>
.head-bottom-panle {
  .left-shadow {
    position: fixed;
    top: 65px;
    left: 0;
    bottom: 0;
    z-index: 5;
    width: 340px;
    background: linear-gradient(270deg, rgba(0, 9, 21, 0) 0%, rgba(0, 11, 30, 0.4) 34%, #001134 100%);
    overflow: hidden;
  }

  .right-shadow {
    position: fixed;
    top: 65px;
    right: 0;
    bottom: 0;
    z-index: 5;
    width: 340px;
    transform: rotate(180deg);
    background: linear-gradient(270deg, rgba(0, 9, 21, 0) 0%, rgba(0, 11, 30, 0.4) 34%, #001134 100%);
    overflow: hidden;
  }

  .top-shadow {
    position: fixed;
    top: 0;
    z-index: 5;
    width: 100%;
    height: 160px;
    background: linear-gradient(0deg, rgba(0, 17, 52, 0) 0%, rgba(0, 17, 52, 0.72) 40%, rgba(0, 17, 52, 0.88) 62%, #001134 100%);
    overflow: hidden;
  }

  .bottom-shadow {
    position: fixed;
    bottom: 0;
    z-index: 5;
    width: 100%;
    height: 100px;
    background: linear-gradient(0deg, #001134 9%, rgba(0, 17, 52, 0) 75%, rgba(0, 17, 52, 0) 100%);
    overflow: hidden;
  }

  .head-panle {
    position: fixed;
    top: 0;
    z-index: 5;
    width: 100%;
    height: 70px;
    background: url('@/assets/screenimages/screen-head-bg.png') center center no-repeat;
    background-size: auto 70px;
    text-align: center;
    overflow: hidden;

    .head-panle-ct-l {
      position: absolute;
      left: 25px;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 18px;
      line-height: 20px;
      color: #FFFFFF;

      .ct-l1 {
        .span1 {
          display: block;
          font-weight: bold;
        }

        .span2 {
          display: block;
          color: #7BBCE6;
          text-align: right;
          font-size: 14px;
          line-height: 16px;
        }
      }

      .ct-l2 {
        width: 1px;
        height: 20px;
        background: #274F85;
        margin: 0 15px;
      }

      .ct-l3 {
        display: flex;
        height: 26px;
        align-items: center;
        cursor: pointer;
        margin-left: -10px;

        img {
          height: 26px;
          margin: 0;
          padding: 0;
          float: left;
        }

        span {
          line-height: 26px;
          float: left;
          margin-left: 10px;
          color: #ffffff;
        }
      }
    }

    .head-panle-ct-r {
      position: absolute;
      right: 25px;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      column-gap: 15px;

      .ct-r3 {
        width: 30px;
        height: 30px;
        background: url("@/assets/screenimages/sandbox.png") center center no-repeat;
        background-size: 30px 30px;
        cursor: pointer;
      }

      .ct-r2 {
        width: 1px;
        height: 20px;
        background: #274F85;
        margin: 0 10px;
      }

      .ct-r1 {
        width: 30px;
        height: 30px;
        background: url("@/assets/screenimages/screen-head-refresh.png") center center no-repeat;
        background-size: 30px 30px;
        cursor: pointer;
      }
    }

    .head-panle-ct-m {
      display: inline-block;
      height: 100%;
      text-align: center;
      opacity: 1;

      font-family: Source Han Sans;
      font-size: 28px;
      font-weight: bold;
      line-height: 60px;
      letter-spacing: 0.15em;
      background: linear-gradient(180deg, #FFFFFF 34%, #7BBCE6 50%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }

  .bottom-panle {
    position: fixed;
    bottom: 0;
    z-index: 5;
    width: 100%;
    height: 100px;
    background: url('@/assets/screenimages/screen-bottom-bg.png') center bottom no-repeat;
    background-size: auto 30px;
    overflow: hidden;
  }
}
</style>