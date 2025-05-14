<template>
  <div class="ewm-tbox">
    <div class="tbox-title">
      <span class="span1">{{ data.title }}</span>
      <div class="menu">
        <span class="span2"><i class="el-icon-download" title="下载" @click="downloadFile"></i></span>
        <span class="span2"><i class="el-icon-s-claim" title="审批进度" @click="approvalProgress(true)"></i></span>
        <span class="span2"><i class="el-icon-circle-close" title="关闭" @click="tboxClose"></i></span>
      </div>
    </div>
    <div class="tbox-ct">
      <div class="loading">
        <img alt="" src="@/assets/images/loading.gif"/>
        <span>加载中...</span>
      </div>
      <iframe
          :src="data.url"
          allowfullscreen="true"
          frameborder="0"
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
      />
    </div>
    <div v-if="data.type==='Meeting'">
      <div v-if="approval" class="step-box">
        <div class="title">
          <span>TBM</span>
          <span class="span2"><i class="el-icon-circle-close" title="关闭" @click="approvalProgress(false)"></i></span>
        </div>
        <div class="body">
          <div class="center">
            <div class="btn">Verification Process</div>
            <div class="step-list">
              <div v-for="(step, index) in data.steps" :key="index" class="step-item">
                <div :class="{ 'gray-bg': !step.detail }" class="step-icon">
                  <i class="el-icon-user-solid"></i>
                </div>
                <div class="step-content">
                  {{ step.detail }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="approval" class="step-box">
        <div class="title">
          <span>TBM</span>
          <span class="span2"><i class="el-icon-circle-close" title="关闭" @click="approvalProgress(false)"></i></span>
        </div>
        <div class="body">
          <div class="center">
            <div class="btn">Verification Process</div>
            <div class="step-list">
              <div v-for="(item, index) in data.pwt" :key="index" class="step-item">
                <div :class="{ 'gray-bg': !item.user_name }" class="step-icon">
                  <i class="el-icon-user-solid"></i>
                </div>
                <div class="step-content">
                  Step&nbsp;{{ index + 1 }}&nbsp;{{ item.user_name || 'Pending Assessment' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters(["fileConfig", "token"]),
  },
  props: ['data'],
  created() {
  },
  data() {
    return {
      approval: false
    }
  },
  methods: {
    // 关闭弹窗
    tboxClose() {
      this.$emit('panleFileTboxClose', false);
    },
    approvalProgress(bool) {
      this.approval = bool
    },
    downloadFile() {
      if (this.data) {
        const link = document.createElement('a')
        link.download = this.data.id
        link.href = this.data.url
        link.click()
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.ewm-tbox {
  position: fixed;
  top: 180px;
  left: 360px;
  z-index: 99;
  width: 700px;
  height: 840px;
  background: rgba(0, 11, 30, 0.9);
  //overflow: hidden;

  .tbox-title {
    height: 40px;
    padding: 0 15px;
    background: rgba(0, 140, 255, 0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .span1 {
      font-size: 16px;
      color: #ffffff;
    }

    .menu {
      width: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .span2 {
        font-size: 18px;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }

  .tbox-ct {
    height: calc(100% - 40px);
    position: relative;
    overflow: hidden;

    > .loading {
      width: 100%;
      height: 100%;
      background-color: transparent;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        display: block;
        width: 20px;
      }

      span {
        font-size: 14px;
        color: #ffffff;
        line-height: 40px;
      }
    }

    > iframe {
      width: 100%;
      height: 795px;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
  }

  .step-box {
    position: absolute;
    left: 720px;
    top: 50px;
    z-index: 10;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 480px;
    margin: auto;

    .title {
      padding: 10px;
      height: 40px;
      width: 100%;
      border-bottom: 1px solid #e3e3e3;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .span2 {
        font-size: 18px;
        color: #000;
        cursor: pointer;
      }
    }

    .body {
      padding: 10px;
      width: 100%;

      .center {
        padding: 10px;
        width: 100%;
        background-color: #f7f7f7;

        .btn {
          display: inline-block;
          padding: 8px 16px;
          background-color: #008fff;
          color: #fff;
          border-radius: 4px;
          font-weight: bold;
          margin-top: 10px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .step-list {
          margin-top: 10px;
          margin-left: 20px;

          .step-item {
            display: flex;
            align-items: center;
            margin-bottom: 25px;
          }

          /* 步骤图标样式 */
          .step-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #2ecc71;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          }

          .step-icon i {
            font-size: 20px;
          }

          .gray-bg {
            background-color: #909399 !important; /* Element Plus 灰色系标准色 */
            transition: background-color 0.3s ease; /* 添加过渡动画 */
          }

          /* 步骤内容样式 */
          .step-content {
            flex: 1;
            padding: 10px 16px;
            background-color: #fff;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            margin-left: 10px;
            font-size: 14px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          /* 步骤内容边框阴影 */
          .step-content:not(:last-child) {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
  }
}
</style>