<template>
  <div id='hkwsBox'>
    <div id='divPlugin' class="plugin"></div>
  </div>
</template>
<script>
/* eslint-disable */
import {initPlugin} from "../../public/demo";

export default {
  name: 'hkwsBoxc',
  data() {
    return {}
  },
  methods: {},
  mounted() {
    initPlugin()
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
.plugin{
  width: 270px;
  height: 140px;
  border: 0;
}
</style>
<style lang="scss">
</style>