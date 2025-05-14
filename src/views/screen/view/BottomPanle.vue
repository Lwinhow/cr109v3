<template>
  <div class="bottom-bg" @wheel="handleWheel">
    <el-steps :active=active align-center finish-status="success">
      <el-step description="Project commencement" title='2022.3'></el-step>
      <el-step description="Current stage" title='2025.5'></el-step>
      <el-step description="Cut and Cover Tunnel Completion" title='2025.5'></el-step>
      <el-step description="TBM Bore Tunnel Structure Completion" title='2026.3'></el-step>
      <el-step description="Station Underground Structure Completion" title='2027.3'></el-step>
      <el-step description="Completion the whole of Works" title='2029.12'></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  name: "BottomPanle",
  data() {
    return {
      active: 3,
    };
  },
  methods: {
    handleWheel(event) {
      // 阻止默认的垂直滚动行为
      event.preventDefault();
      // 根据鼠标滚轮的滚动方向调整scrollLeft
      this.$el.scrollLeft += event.deltaY;
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom-bg {
  padding: 20px 0;
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 6;
  width: 1220px;
  height: 150px;
  border-radius: 10px;
  background: url('@/assets/screenimages/screen-box-bg.png') 0 bottom no-repeat;
  background-size: 100% auto;
  color: #FFFFFF;

  ::v-deep {
    .el-step__description {
      font-size: 14px;
      padding: 0 10px;
    }

    .el-step__description.is-process {
      color: #f2aa3f;
    }

    .el-step__title.is-process {
      color: #f2aa3f;
    }

    .el-step__head.is-process {
      color: #f2aa3f; //图表
      border-color: #f2aa3f; //轮廓和线
    }

    .el-step__description.is-success {
      color: #37c546;
    }

    .el-step__title.is-success {
      font-weight: bold;
      color: #37c546;
    }

    .el-step__head.is-success {
      color: #37c546; //图表
      border-color: #37c546; //轮廓和线
    }
  }
}
</style>