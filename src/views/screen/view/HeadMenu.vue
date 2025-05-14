<template>
  <div>
    <div class="head-menu">
      <div :class="['hm-btn', {'current':!$route.query.page}]" @click="hmc()">{{ btnN[0] }}</div>
      <div :class="['hm-btn', {'current':$route.query.page===routeN[0]}]" @click="hmc(0)">{{ btnN[1] }}</div>
      <div :class="['hm-btn', {'current':$route.query.page===routeN[1]}]" @click="hmc(1)">{{ btnN[2] }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeadMenu",
  components: {},
  data() {
    return {
      btnN: ['Overview', 'Alarm', 'Scenario'],
      routeN: ['alarm', 'scenario'],
    };
  },
  methods: {
    hmc(page) {
      if (this.routeN[page] !== this.$route.query.page) {
        this.$router.push({path: this.$route.path, query: {page: this.routeN[page]}})
      }
    },
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.head-menu {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 6;
  width: 1200px;
  height: 80px;
  padding: 10px 0 0 0;
  background: url("@/assets/screenimages/screen-menu-bg.png") center bottom no-repeat;
  background-size: auto 80px;
  display: flex;
  justify-content: center;
  column-gap: 15px;
  overflow: hidden;

  .hm-btn {
    width: 118px;
    height: 38px;
    background: url("@/assets/screenimages/screen-menu-btn1.png") 0 0 no-repeat;
    background-size: 118px auto;
    text-align: center;
    font-size: 18px;
    line-height: 38px;
    color: #ffffff;
    cursor: pointer;
    position: relative;

    &.current {
      background: url("@/assets/screenimages/screen-menu-btn2.png") 0 0 no-repeat;
      background-size: 118px auto;
    }
  }
}
</style>