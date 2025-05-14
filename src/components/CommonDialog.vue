<template>
  <div v-if="dialogShow" id="commonDialog">
    <img alt="" class="close-btn" src="@/assets/images/close-btn.png" @click="closeBox"/>
    <h6 v-if="dialogTitle" class="dialogTitle">
      <span v-html="dialogTitle"></span>
    </h6>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CommonDialog",
  data() {
    return {}
  },
  props: {
    dialogTitle: {// 标题
      type: String,
      default: ""
    },
    dialogShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeBox() {
      this.$emit('update:dialogShow', false)
    },
  },
}
</script>

<style lang="scss" scoped>
#commonDialog {
  //width:fit-content;
  background-image: radial-gradient(circle at 50% 2.8%, #2E5C88 0%, rgba(33, 65, 97, 0.85) 56%, rgba(33, 49, 70, 0.95) 107%);
  border-radius: 8px;
  position: fixed;
  padding: 0 15px 10px 15px;
  z-index: 1000;
  //overflow: hidden;
  > .close-btn {
    width: 65px;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }

  > .dialogTitle {
    width: fit-content;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
    background: url("@/assets/images/line.png") left bottom no-repeat;
    background-size: 100% auto;

    > span {
      font-size: 20px;
      background: linear-gradient(180deg, #FFFFFF 32%, #92DEFF 70%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      letter-spacing: 0.1em;
      font-weight: bold;
    }
  }
}
</style>