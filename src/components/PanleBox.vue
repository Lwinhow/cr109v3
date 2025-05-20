<template>
  <div :style="[{flex: (boxHeight?'none':1)}, {height: boxHeight}]" class="content-panle-box">
    <div class="panle-box-title"><span @click="turnToPage(title)">{{ title }}</span></div>
    <div class="panle-box-ct">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanleBox',
  props: ['title', 'boxHeight'],
  methods: {
    turnToPage(title) {
      switch (true) {
        case title.includes("Context Awareness"):
          window.open("http://10.5.4.10:8000/?projectName=CR109&companyInformation=PAI", "_blank");
          break;
        case title.includes("Alarm Event"):
          window.open("http://10.5.4.10/#/recordQuery/alarmQuery", "_blank");
          break;
        case title.includes("Personnel Attendance"):
          window.open("http://10.5.4.10/#/personnelManagement/analysis", "_blank");
          break;
        case title.includes("Entry & Exit Situation"):
          window.open("http://10.5.4.10/#/recordQuery/attendanceList", "_blank");
          break;
        case title.includes("Personnel Positioning"):
          this.$emit('max-screen');
          break;
        case title.includes("Quality & Safety Status"):
          window.open("https://server.globalbes.sg/ctmgr/index.php?r=license/licensepdf/list&program_id=4076");
          break;
        case title.includes("Toolbox Meeting"):
          window.open("https://server.globalbes.sg/ctmgr/index.php?r=tbm/meeting/list&program_id=4076");
          break;
        case title.includes("Overview Video"):
          WebVideoCtrl.I_FullScreen(true)
          break;
        case title.includes("Video Monitoring"):
          WebVideoCtrl.I_FullScreen(true)
          break;
        default:
          break
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.content-panle-box {
  width: 100%;
  flex: 1;
  min-height: 0;
  background: url('@/assets/screenimages/screen-box-bg.png') 0 bottom no-repeat;
  background-size: 100% auto;

  .panle-box-title {
    width: 100%;
    height: 42px;
    background: url('@/assets/screenimages/screen-title-bg.png') 0 0 no-repeat;
    background-size: 100% auto;
    padding-left: 40px;
    font-size: 18px;
    line-height: 36px;
    font-weight: bold;
    color: #ffffff;
  }

  .panle-box-ct {
    width: 100%;
    height: calc(100% - 42px);
    padding: 10px;
    overflow: hidden;
  }
}
</style>