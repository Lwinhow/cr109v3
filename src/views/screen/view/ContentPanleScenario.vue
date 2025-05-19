<template>
  <div class="content-panle">
    <head-menu></head-menu>
    <left-menu ref="leftMenu"></left-menu>
    <right-menu></right-menu>
  </div>
</template>

<script>
import LeftMenu from "@/components/sand/LeftMenu.vue";
import HeadMenu from "@/components/sand/HeadMenu.vue";
import RightMenu from "@/components/sand/RightMenu.vue";
import HkvsBox from "@/components/hkwsBox.vue";

export default {
  name: "ContentPanleScenario",
  components: {HkvsBox, RightMenu, HeadMenu, LeftMenu},
  data() {
    return {}
  },
  mounted() {
    this.hidPlugin()
  },
  destroyed() {

  },
  methods: {
    hidPlugin() {
      WebVideoCtrl.I_HidPlugin().then(() => {
      }).catch(() => {
      })
    },
  }
};
</script>

<style lang="scss">
@import "~@/styles/screen2.scss";
</style>
<style lang="scss" scoped>
</style>