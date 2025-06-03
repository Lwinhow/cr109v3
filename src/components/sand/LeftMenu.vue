<template>
  <div class="left-menu">
    <div v-for="(item,index) in leftBtnDataPl"
         :key="'left-menu'+index"
         :class="[`btn`, {'current': currentBtn===index}]"
         class="left-menu-btn"
         @click="leftBtnHandle(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "LeftMenu",
  data() {
    return {
      currentBtn: null,//点亮提示
      currentBottomBtn: 0,
      leftBtnDataPl: ['Presentation', 'Slice', 'Completed', 'Processing', 'Overlooking', 'Tunnel'],
    };
  },
  methods: {
    leftBtnHandle(index) {
      if (this.currentBtn !== index) {
        this.currentBtn = index
        switch (this.currentBtn) {
          case 0:
            __g.camera.playAnimation(0)
            break;
          case 1:
            this.$parent.$parent.planeClip();
            break;
          case 2:
            __g.infoTree.show([
              'F6ABC22442B91B5EF7C740BAE23991BA',//商场模型
              'FBE4932F4A31B2BEE5955B835E017551',//结构模型
              '2FBB0F894CFD2ECF697760A7DCA61969',//项目模型
            ])
            __g.infoTree.hide([
              '9561C9FE4B3F953060DA20993729C110',//在建
              'F762F9024430C36142D448BDFAF4B0FF',//倾斜摄影
              '3D378F6140734B6EA6DA10AF135E47C5',//检测模型
            ])
            break;
          case 3:
            __g.infoTree.hide([
              'F6ABC22442B91B5EF7C740BAE23991BA',//商场模型
              'FBE4932F4A31B2BEE5955B835E017551',//结构模型
              '2FBB0F894CFD2ECF697760A7DCA61969',//项目模型
              '349280C44403CF4FA47257999931BEF5',//工程走向
            ])
            __g.infoTree.show([
              '9561C9FE4B3F953060DA20993729C110',//在建
              'F762F9024430C36142D448BDFAF4B0FF',//倾斜摄影
              '3D378F6140734B6EA6DA10AF135E47C5',//检测模型
            ])
            break;
          case 4:
            __g.camera.set([-1311649.710625, 157136.970625, 533.776914, -52.974453, -81.506279, 3])
            break;
          case 5:
            __g.camera.set([-1311387.8925, 157803.318638, -7.804196, -7.981526, -61.701206, 3])
            break;
          default:
            break;
        }
      } else {
        this.currentBtn = null
        switch (index) {
          case 0:
            __g.camera.stopAnimation()
            __g.infoTree.hide('349280C44403CF4FA47257999931BEF5')
            __g.camera.set(-1311659.379375, 156848.25625, 1535.974219, -60.440422, -86.326126, 2)
            break;
          case 1:
            __g.tools.stopPlaneClip();
            break;
          case 2:
            __g.infoTree.hide([
              'F6ABC22442B91B5EF7C740BAE23991BA',//商业模型
              '2FBB0F894CFD2ECF697760A7DCA61969',//上层模型

              '734A66D94AA5D43840FF8DB6CD3EF00E',//结构模型
            ])
            __g.tileLayer.hideActors([
              {
                id: '2929EE0F4E3B5DBC106A5E84D5A11CF7',
                objectIds: ['0mtLUR_lqO6dSzIpY61rEU', '1b2LVM2n49_sCqbWJHFhS$']
              },
              {
                id: '6F131A6E44FC74C00A89DB85C75F348F',
                objectIds: ['3mV$bRpMjGjht$IScT9Dpb', '134JEIq4YG4im5bKeqZ3pJ']
              },
            ])
            __g.infoTree.show([
              '9561C9FE4B3F953060DA20993729C110',//在建
              'F762F9024430C36142D448BDFAF4B0FF',//倾斜摄影
              '4AB5137A4C3569A15C5E59972AF85322',//工程建筑
            ])
            break;
          case 3:
            break;
          case 4:
            break;
          default:
            break;
        }
      }
    },
  },
  destroyed() {
    __g.camera.stopAnimation()
    __g.tools.stopPlaneClip();
    __g.infoTree.hide('349280C44403CF4FA47257999931BEF5')
  }
};
</script>
<style lang="scss" scoped>
.left-menu {
  position: absolute;
  z-index: 6;
  left: 0;
  top: 160px;
  width: 130px;
  height: auto;
  overflow-x: hidden;
  overflow-y: hidden;

  .left-menu-btn {
    display: flow;
    left: 30px;
    top: 130px;
    z-index: 6;
    width: 130px;
    height: 35px;
    margin-bottom: 40px;
    text-align: center;
    padding: 0;
    font-family: Source Han Sans;
    font-size: 16px;
    line-height: 35px;
    color: #ffffff;
    cursor: pointer;

    &.btn {
      background: url("@/assets/screenimages/leftBtn.png") 0 0 no-repeat;
      background-size: 100% 100%;

      &.current {
        background: url("@/assets/screenimages/leftBtnClick.png") 0 0 no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>