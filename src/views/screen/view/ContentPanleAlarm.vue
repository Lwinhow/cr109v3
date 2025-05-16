<template>
  <div class="content-panle">
    <!-- 左边 -->
    <div class="content-panle-left">
      <panle-box box-height="330px" title="Comprehensive Indicators">
        <div class="comprehensive-indicators">
          <div class="title">
            <div>All Device Online Rate :</div>
            <span>{{ deviceOnlineRate }} %</span>
          </div>
        </div>
        <div id="glBarChart" ref="glBarChart" style="margin-top: 10px;height: 200px;width: 300px;"></div>
      </panle-box>
      <panle-box box-height="220px" title="Context Awareness">
        <ul class="environment">
          <li v-for="(type, index) in hjjcType" :key="index" @click="hjjcClick(type)">
            <div class="image-bg">
              <img :src="type.image" alt=""/>
            </div>
            <div class="data">
              <p>
                <span class="name" v-html="type.label"></span>
                <span v-if="type.min || type.max" class="intervalValue">(<template
                    v-if="type.min || type.min == 0">{{ type.min }}-</template><template
                    v-else>≤</template>{{ type.max }})</span>
              </p>
              <p>
                <span :class="['value',{activeRed:showRedColor(type)}]">{{ hjjcData[type.key] }}</span>
                <span class="unit">{{ type.util }}</span>
              </p>
            </div>
          </li>
        </ul>
      </panle-box>
      <panle-box :title="`Alarm Event ( ${alarmArr.length} times )`" box-height="165px">
        <div class="alarm-box panle-public-zbxx">
          <div class="public-zbxx-title">
            <span style="flex:0 0 135px;">Time</span>
            <span style="flex:0 0 100px;">Content</span>
            <span>Status</span>
          </div>
          <div class="alarm_list" style="overflow:auto;height:90%;">
            <div v-for="(item,index) in alarmArr" :key="'zbxx'+index" class="public-zbxx-box">
              <div class="public-zbxx-cell">
                <span style="flex:0 0 135px;">{{ item.alarmTime }}</span>
                <span
                    :title="item.alarmDescription"
                    style="flex:0 0 85px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{
                    item.alarmDescription
                  }}</span>
                <span style="cursor:pointer;font-size:13px;">
									<span
                      :class="[{'green-tag':item.handlingStatus === 'COMPLETED'},{'blue-tag':item.handlingStatus === 'PROCESSING'},{'orange-tag':item.handlingStatus == 'UNPROCESSED'}]">
										{{ item.handlingStatusName }}
									</span>
								</span>
              </div>
            </div>
          </div>
        </div>
      </panle-box>
      <panle-box title="Alarm Push">
        <div class="alarm-box panle-public-zbxx">
          <div class="public-zbxx-title">
            <span style="flex:0 0 100px;">Name</span>
            <span style="flex:0 0 100px;">Job</span>
            <span style="flex:0 0 100px;">Phone</span>
          </div>
          <div class="alarm_list" style="overflow:auto;height:90%;">
            <div v-for="(item,index) in emergencyArr" :key="'zbxx'+index" class="public-zbxx-box">
              <div class="public-zbxx-cell">
                <span style="flex:0 0 100px;">{{ item.name }}</span>
                <span style="flex:0 0 100px;">{{ item.job }}</span>
                <span style="">{{ item.phone }}</span>
              </div>
            </div>
          </div>
        </div>
      </panle-box>
    </div>

    <!-- 右边 -->
    <div class="content-panle-right">
      <panle-box box-height="260px" title="Video Monitoring">
        <div class="alarm-video">
          <div class="title">
            <span class="span1"></span>
            <el-select v-model="hkwsIp" class="panle-public-select" placeholder="请选择" popper-class="mySelectStyle"
                       style="width: 200px" @change="playhkws()">
              <el-option
                  v-for="item in hkwsArr"
                  :key="item.ip"
                  :label="item.devieName"
                  :value="item.ip"
              >
              </el-option>
            </el-select>
          </div>
          <div class="video">
            <hkvs-box></hkvs-box>
          </div>
        </div>
      </panle-box>
      <panle-box box-height="145px" title="Personnel Attendance">
        <div class="attendance">
          <div class="attendance-box">
            <div class="span1">Attendance Number</div>
            <div class="span2">
              <div class="attendance1"></div>
              <div class="span">
                {{ attendanceData.attendanceTodayCount }}
              </div>
            </div>
          </div>
          <div class="attendance-box">
            <div class="span1">Attendees Number</div>
            <div class="span2">
              <div class="attendance2"></div>
              <div class="span">
                {{ attendanceData.onSiteCount }}
              </div>
            </div>
          </div>
        </div>
      </panle-box>
      <panle-box box-height="250px" title="Entry & Exit Situation">
        <div class="alarm-box panle-public-zbxx">
          <div class="public-zbxx-title">
            <span style="flex:0 0 90px;">Entry Time</span>
            <span style="flex:0 0 90px;">Exit Content</span>
            <span style="flex:0 0 120px;">Staff Name</span>
          </div>
          <div class="alarm_list" style="overflow:auto;height:80%;">
            <div v-for="(item,index) in situation" :key="'zbxx'+index" class="public-zbxx-box">
              <div class="public-zbxx-cell">
                <span style="flex: 0 0 90px">{{ item.firstEntryTime }}</span>
                <span style="flex: 0 0 90px">{{ item.lastExitTime }}</span>
                <span style="flex:0 0 120px;">{{ item.fullName }}</span>
              </div>
            </div>
          </div>
        </div>
      </panle-box>
      <panle-box title="Personnel Positioning" @max-screen="iframeMax">
        <div v-if="false" class="alarm-box panle-public-zbxx">
          <div class="public-zbxx-title">
            <span style="flex:0 0 140px;">Time</span>
            <span style="flex:0 0 50px;">Name</span>
            <span style="flex:0 0 75px;">Location</span>
            <span>Button</span>
          </div>
          <div class="alarm_list" style="overflow:auto;height:90%;">
            <div v-for="(item,index) in position" :key="'zbxx'+index" class="public-zbxx-box">
              <div class="public-zbxx-cell">
                <span style="flex:0 0 140px;">{{ item.time }}</span>
                <span style="flex:0 0 50px;">{{ item.name }}</span>
                <span style="flex:0 0 85px">{{ item.location }}</span>
                <div class="btnP" title="Positioning Personnel" @click=focus(item)>
                </div>
              </div>
            </div>
          </div>
        </div>
        <iframe
            v-if="showIframeMin"
            allowfullscreen
            class="iframeClassMin"
            frameborder="0"
            height="100%"
            src="http://10.5.4.10:8010/?projectName=CR109&companyInformation=PAI"
            width="100%"
        ></iframe>

      </panle-box>
    </div>

    <!--  弹窗  -->
    <CommonDialog
        :dialogShow.sync="lineTboxShow"
        :dialogTitle="`Timely ${environmentData.label} Tendency`"
        style="left:555px ;top:280px">
      <ContentLineTbox
          :key="keyLine"
          :environmentData="environmentData"
          :initLineData="environmentLine">
      </ContentLineTbox>
    </CommonDialog>

    <div v-if="showIframeMax" class="iframeBox">
      <div class="icon" @click="iframeMin">
        <i class="el-icon-close"></i>
      </div>
    </div>
    <iframe
        v-if="showIframeMax"
        allowfullscreen
        class="iframeClassMax"
        frameborder="0"
        height="100%"
        src="http://10.5.4.10:8010/?projectName=CR109&companyInformation=PAI"
        width="100%"
    ></iframe>
  </div>
</template>

<script>
import PanleBox from "@/components/PanleBox.vue";
import * as echarts from "echarts";
import CommonDialog from "@/components/CommonDialog.vue";
import ContentLineTbox from "@/components/ContentLineTbox.vue";
import {
  getAlarmRecord,
  getAttendanceList,
  getDeviceOnline,
  getGasreCord,
  getPersionStat
} from "@/apis/getData";
import HlsVideo from "@/components/HlsVideo.vue";
import {addMarkerCamera} from "@/utils/marker";
import HkvsBox from "@/components/hkwsBox.vue";

export default {
  name: "ContentPanleAlarm",
  components: {HkvsBox, HlsVideo, ContentLineTbox, CommonDialog, PanleBox},
  watch: {},
  props: {
    hkwsArr: {
      type: Array,
      default: []
    },
    hkwsFlag1: {
      type: Boolean,
      default: false
    },
    hkwsFlag2: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hkwsIp: null,

      keyLine: 0, //刷新图表的key
      environmentData: {}, //折线图类型
      environmentLine: {}, //初始数据
      lineTboxShow: false,

      hjjcData: {
        "cH4": 0,
        "h2S": 0,
        "o2": 0,
        "humid": 0,
        "temp": 0,
        "co": 0,
      },
      hjjcDataTimer: null,
      hjjcType: [ //环境监测类型
        {
          label: 'Temp.',
          name: '温度',
          name1: "温度",
          image: require(`@/assets/screenimages/screen-glhjgz-wd.png`),
          data: 0,
          util: '℃',
          key: 'temp',
          min: 5,
          max: 35,
          yMin: 0,
          yMax: 50
        },
        {
          label: 'Hum.',
          name: '湿度',
          name1: "湿度",
          image: require(`@/assets/screenimages/screen-glhjgz-sd.png`),
          data: 0,
          util: '%rh',
          key: 'humid',
          min: 40,
          max: 90,
          yMin: 0,
          yMax: 100
        },
        {
          label: 'CH<sub>4</sub>',
          name: 'CH4',
          name1: "甲烷",
          image: require(`@/assets/screenimages/screen-glhjgz-ch4.png`),
          data: 0,
          util: 'LEL',
          key: 'cH4',
          max: 10,
          yMin: 0,
          yMax: 30
        },
        {
          label: 'O<sub>2</sub>',
          name: 'O2',
          name1: "氧气",
          image: require(`@/assets/screenimages/screen-glhjgz-o2.png`),
          data: 0,
          util: '%vol',
          key: 'o2',
          min: 19.5,
          max: 23.5,
          yMin: 0,
          yMax: 30
        },
        {
          label: 'H<sub>2</sub>S',
          name: 'H2S',
          name1: "硫化氢",
          image: require(`@/assets/screenimages/screen-glhjgz-h2s.png`),
          data: 0,
          util: 'ppm',
          key: 'h2S',
          max: 10,
          yMin: 0,
          yMax: 8
        },
        {
          label: 'CO',
          name: 'CO',
          name1: "一氧化碳",
          image: require(`@/assets/screenimages/screen-glhjgz-co.png`),
          data: 0,
          util: 'ppm',
          key: 'co',
          max: 25,
          yMin: 0,
          yMax: 8
        },
      ],

      alarmArr: [],
      alarmArrTimer: null,

      situation: [],
      situationTimer: null,

      position: [
        {
          time: '2025-01-01 13:20:50',
          name: 'Alan',
          location: 'Tunnel-L1',
          p: [-1311298.56, 157976.43, -16.6915185546875],
        },
        {
          time: '2025-01-04 13:20:50',
          name: 'Blan',
          location: 'Tunnel-L2',
          p: [-1311087.04, 158092.08000000002, -22.57826171875]
        },
        {
          time: '2025-01-08 13:20:50',
          name: 'Dlan',
          location: 'Out',
          p: [],
        },
        {
          time: '2025-01-12 13:20:50',
          name: 'Flan',
          location: 'Station-1',
          p: [-1311403.84, 157757.35, 10.22150634765625]
        },
        {
          time: '2025-01-21 13:20:50',
          name: 'Hlan',
          location: 'Station-O2',
          p: [-1311513.6, 157735.45, 10.708605957031251]
        },
        {
          time: '2025-02-01 13:20:50',
          name: 'Nlan',
          location: 'Station-3',
          p: []
        },
        {
          time: '2025-02-03 13:20:50',
          name: 'Klan',
          location: 'Station-4',
          p: []
        },
      ],

      emergencyArr: [
        {
          name: 'Chen Jun',
          job: 'Tunnel manager',
          phone: '+65 9296 0917',
        },
        {
          name: 'Tan Feng',
          job: 'Deputy tunnel manager',
          phone: '+65 9112 2962',
        },
      ],

      attendanceData: {
        totalPersonnelCount: 0,
        attendanceTodayCount: 0,
        attendanceRate: 0,
        onSiteCount: 0
      },
      attendanceTimer: null,

      deviceOnlineData: {
        cctvOnline: 0,
        cctvTotal: 0,
        gasDetectorOnline: 0,
        gasDetectorTotal: 0,
        tunnelBoxOnline: 0,
        tunnelBoxTotal: 0,
      },
      deviceOnlineRate: 0,
      deviceOnlineTimer: null,
      deviceOnlineChart: null,

      showIframeMin: true,
      showIframeMax: false,
    };
  },
  async mounted() {
    await addMarkerCamera()
    let lineDom = this.$refs.glBarChart;
    this.deviceOnlineChart = echarts.init(lineDom);
    this._getDeviceOnline()
    this._getAlarmRecord()
    this._getPersionStat()
    this._getAttendanceList()
    this._getGasreCord()
    if (this.hkwsArr.length > 0) {
      this.hkwsIp = this.hkwsArr[0].ip
    }
  },
  destroyed() {
    clearTimeout(this.hjjcDataTimer);
    this.hjjcDataTimer = null;
    clearTimeout(this.alarmArrTimer);
    this.alarmArrTimer = null;
    clearTimeout(this.situationTimer);
    this.situationTimer = null;
    clearTimeout(this.attendanceTimer);
    this.attendanceTimer = null;
    clearTimeout(this.deviceOnlineTimer);
    this.deviceOnlineTimer = null;
    __g.marker.clear()
  },
  methods: {
    playhkws() {
      console.log(this.hkwsArr)
      console.log(this.hkwsFlag1, this.hkwsFlag2)
      if (this.hkwsArr.length > 0 && this.hkwsFlag1 && this.hkwsFlag2) {
        this.clickStartRealPlay(1)
      }
    },
    clickStartRealPlay(iStreamType) {
      const index = this.hkwsArr.findIndex(item => item.ip === this.hkwsIp);
      let _this = this
      let oWndInfo = WebVideoCtrl.I_GetWindowStatus(0),
          szDeviceIdentify = _this.hkwsIp + "_80",
          iRtspPort = parseInt(_this.hkwsArr[index].rtspport, 10),
          iChannelID = parseInt(_this.hkwsArr[index].channels[0].id, 10),
          bZeroChannel = false

      let startRealPlay = function () {
        WebVideoCtrl.I_StartRealPlay(szDeviceIdentify, {
          iStreamType: iStreamType,
          iChannelID: iChannelID,
          bZeroChannel: bZeroChannel,
          iPort: iRtspPort,
          success: function () {
            console.log(1);
          },
          error: function (oError) {
            console.log(2);
          }
        });
      };

      if (oWndInfo != null) {// 已经在播放了，先停止
        WebVideoCtrl.I_Stop({
          success: function () {
            startRealPlay();
          }
        });
      } else {
        startRealPlay();
      }
    },

    closeAllDialog() {
      this.lineTboxShow = false; //环境感知折线图弹窗
    },
    hjjcClick(type) {
      if (type.key) {
        this.closeAllDialog();
        this.keyLine++;
        this.environmentData = type;
        this.lineTboxShow = true;
        if (type.key !== 'humid' && type.key !== 'temp') {
          __g.camera.set([-1311067.237812, 158073.031426, -19.420905, -3.498901, 167.725174, 3])
        }
      }
    },

    showRedColor(type) {
      return ((type.min || type.min == 0) && this.turnNumber(this.hjjcData[type.key]) <= this.turnNumber(type.min)) ||
          ((type.max || type.max == 0) && this.turnNumber(this.hjjcData[type.key]) >= this.turnNumber(type.max));
    },

    drawDeviceOnlineChart() {
      let deviceOnlineChartOptions = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          textStyle: {
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
        grid: {
          top: "10",
          left: '-20',
          right: '5',
          bottom: '0',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ["CCTV", "Tunnel Box", "Gas Detector"],
          axisLabel: {
            color: "#FFFFFF", // x轴颜色
            fontWeight: "normal",
            fontSize: "12",
          },
          axisLine: {
            lineStyle: {
              color: "#FFFFFF",
            },
          },
        }],
        yAxis: [{
          type: 'value',
          show: false
        }],
        series: [
          {
            name: 'Total',
            type: 'bar',
            barWidth: "12",
            barGap: '100%',
            data: [this.deviceOnlineData.cctvTotal, this.deviceOnlineData.tunnelBoxTotal, this.deviceOnlineData.gasDetectorTotal],
            label: {
              show: true,
              position: "top",
              color: "#fff",
              fontSize: 12,
              fontWeight: "bold"
            },
            itemStyle: {
              opacity: 0.7,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: "#FFFFFF"
                },
                  {
                    offset: 0.3,
                    color: "#FA6162"
                  },
                  {
                    offset: 1,
                    color: "#933A3B"
                  }
                ]
              },
              borderRadius: 0,
            },
          },
          {
            name: 'Online',
            type: 'bar',
            barWidth: "12",
            data: [this.deviceOnlineData.cctvOnline, this.deviceOnlineData.tunnelBoxOnline, this.deviceOnlineData.gasDetectorOnline],
            label: {
              show: true,
              position: "top",
              color: "#fff",
              fontSize: 12,
              fontWeight: "bold"
            },
            itemStyle: {
              opacity: 0.7,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: "#FFFFFF"
                },
                  {
                    offset: 0.3,
                    color: "#00EFFF"
                  },
                  {
                    offset: 1,
                    color: "#00527D"
                  },
                ]
              },
              borderRadius: 0,
            },
          },
        ]
      };
      this.deviceOnlineChart.setOption(deviceOnlineChartOptions)
    },

    async focus(item) {
      if (item.location !== 'Out' && item.p.length > 0) {
        __g.customObject.clear();
        let o = {
          id: 'o1',//自定义对象唯一id
          pakFilePath: '@path:DTS_Library_6.1_240731.pak',//资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
          assetPath: '/JC_CustomAssets/RoleLibrary/Exhibition/动态人物/工人_1',//资源目录，自定义对象在pak文件资源包里的相对路径
          location: item.p,//位置坐标
          coordinateType: 0,// 坐标系类型
          rotation: [0, 0, 0],// 世界坐标系旋转
          range: [0, 1000],//可见范围
          groupId: "coGroup",//分组id
          localRotation: [0, 0, 0],//模型自身旋转
          scale: [1, 1, 1],//模型缩放
          isEffectRotation: true,//是否开启旋转效果
          smoothMotion: 1,   //1: 平滑移动，0: 跳跃移动
          supportAttach: false, //不支持贴画贴合
          visible: true,//模型加载后默认是否显示
          autoHeight: false //是否开启自动高度 开启后自动贴地不再使用坐标Z
        };
        await __g.customObject.add(o);
        __g.customObject.focus(o.id);
      }
    },

    calculateOnlineRate(deviceData) {
      const totalDevices = deviceData.cctvTotal + deviceData.gasDetectorTotal + deviceData.tunnelBoxTotal;
      const totalOnline = deviceData.cctvOnline + deviceData.gasDetectorOnline + deviceData.tunnelBoxOnline;
      const onlineRate = (totalOnline / totalDevices) * 100;
      return onlineRate.toFixed(2);
    },

    _getDeviceOnline() {
      getDeviceOnline().then(res => {
        if (res) {
          this.deviceOnlineData = res
          this.deviceOnlineRate = this.calculateOnlineRate(this.deviceOnlineData)
          this.drawDeviceOnlineChart();
        }
        if (this.$refs.glBarChart) {
          if (this.deviceOnlineTimer) {
            clearTimeout(this.deviceOnlineTimer);
          }
          this.deviceOnlineTimer = setTimeout(() => {
            this._getDeviceOnline();
          }, 5 * 1000)
        }
      }).catch(err => {
        if (this.$refs.glBarChart) {
          if (this.deviceOnlineTimer) {
            clearTimeout(this.deviceOnlineTimer);
          }
          this.deviceOnlineTimer = setTimeout(() => {
            this._getDeviceOnline();
          }, 5 * 1000)
        }
      })
    },
    _getAlarmRecord() {
      getAlarmRecord({
        projectName: 'CR109',
        pageSize: 30,
        pageIndex: 1
      }).then(res => {
        if (res) {
          this.alarmArr = res
          if (this.alarmArrTimer) {
            clearTimeout(this.alarmArrTimer);
          }
          this.alarmArrTimer = setTimeout(() => {
            this._getAlarmRecord();
          }, 5 * 1000)
        }
      }).catch(err => {
        if (this.alarmArrTimer) {
          clearTimeout(this.alarmArrTimer);
        }
        this.alarmArrTimer = setTimeout(() => {
          this._getAlarmRecord();
        }, 5 * 1000)
      })
    },
    _getPersionStat() {
      getPersionStat().then(res => {
        if (res) {
          this.attendanceData = res
          if (this.attendanceTimer) {
            clearTimeout(this.attendanceTimer);
          }
          this.attendanceTimer = setTimeout(() => {
            this._getPersionStat();
          }, 5 * 1000)
        }
      }).catch(err => {
        if (this.attendanceTimer) {
          clearTimeout(this.attendanceTimer);
        }
        this.attendanceTimer = setTimeout(() => {
          this._getPersionStat();
        }, 5 * 1000)
      })
    },
    _getAttendanceList() {
      getAttendanceList({
        'projectName': 'CR109',
        'pageSize': 30,
        'pageIndex': 1,
      }).then(res => {
        if (res) {
          this.situation = res
          this.situation.forEach(item => {
            if (item.firstEntryTime) {
              item.firstEntryTime = item.firstEntryTime.replace('T', ' ');
            }
            if (item.lastExitTime) {
              item.lastExitTime = item.lastExitTime.replace('T', ' ');
            }
          });
        }
        if (this.situationTimer) {
          clearTimeout(this.situationTimer);
        }
        this.situationTimer = setTimeout(() => {
          this._getAttendanceList();
        }, 5 * 1000)
      }).catch(err => {
        if (this.situationTimer) {
          clearTimeout(this.situationTimer);
        }
        this.situationTimer = setTimeout(() => {
          this._getAttendanceList();
        }, 5 * 1000)
      })
    },
    _getGasreCord() {
      getGasreCord().then(res => {
        if (res) {
          this.hjjcData = res[0]
        }
        if (this.hjjcDataTimer) {
          clearTimeout(this.hjjcDataTimer);
        }
        this.hjjcDataTimer = setTimeout(() => {
          this._getGasreCord();
        }, 5 * 1000)
      }).catch(err => {
        if (this.hjjcDataTimer) {
          clearTimeout(this.hjjcDataTimer);
        }
        this.hjjcDataTimer = setTimeout(() => {
          this._getGasreCord();
        }, 5 * 1000)
      })
    },

    iframeMax() {
      this.showIframeMax = true
      this.showIframeMin = false
    },
    iframeMin() {
      this.showIframeMax = false
      this.showIframeMin = true
    }
  }
};
</script>

<style lang="scss">
@import "~@/styles/screen2.scss";
</style>
<style lang="scss" scoped>
//左
.comprehensive-indicators {
  padding: 10px;
  margin-left: 20px;
  width: 100%;

  .title {
    display: flex;
    align-items: center;

    div {
      width: 160px;
      flex-shrink: 0;
      font-size: 14px;
      color: #ffffff;
    }

    span {
      font-size: 18px;
      font-weight: bold;
      color: #02FFFE;
    }
  }
}

.environment { // 管廊环境感知
  display: flex;
  flex-wrap: wrap;

  > li {
    display: flex;
    color: #FFFFFF;
    width: 50%;
    margin-bottom: 10px;

    .image-bg {
      width: 45px;
      height: 45px;
      margin-right: 5px;
      background: url('@/assets/screenimages/screen-glhjgz-bg.png') 0 0 no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 18px;
        height: 18px;
      }
    }

    > .data {
      > p:first-child {
        > .name {
          font-size: 16px;
        }

        > .intervalValue {
          font-size: 14px;
        }
      }

      > p:last-child {
        > .value {
          font-weight: bold;
          font-size: 18px;
          color: #0FF990;

          &.activeRed {
            color: #FF3636;
          }
        }

        > .unit {
          font-weight: normal;
          font-size: 14px;
          margin-left: 3px;
        }
      }
    }
  }
}

.alarm-box {
  width: 100%;
  height: 100%;

  .alarm_list {
    width: 100%;
    overflow: auto;

    .btnP {
      cursor: pointer;
      width: 18px;
      height: 18px;
      background: url('@/assets/screenimages/定位.png') 0 bottom no-repeat;
      background-size: 100% 100%;

      &:hover {
        background: url('@/assets/screenimages/定位2.png') 0 bottom no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}

//右
.alarm-video {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .title {
    display: flex;
    width: 100%;
    margin-top: 5px;

    .span1 {
      margin-top: 3px;
      margin-left: 10px;
      margin-right: 10px;
      display: block;
      float: left;
      width: 19px;
      height: 20px;
      background: url('@/assets/screenimages/screen-digital5.png') center center no-repeat;
      background-size: 16px auto;
    }

    .span2 {
      display: block;
      float: left;
      font-size: 14px;
      color: #ffffff;
      line-height: 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  .video {
    margin-top: 5px;
    width: 100%;
    height: 160px;
    border: 2px solid rgba(0, 140, 255, 0.2);
  }
}

.attendance {
  display: flex;
  width: 100%;
  gap: 10px;

  .attendance-box {
    background: linear-gradient(180deg, rgba(3, 24, 59, 0.51) 13%, rgba(0, 140, 255, 0.07) 100%);
    border: 1px solid rgba(0, 140, 255, 0.2);
    color: #FFFFFF;
    width: 150px;
    height: 80px;

    .span1 {
      display: flex;
      width: 150px;
      justify-content: center;
      padding: 5px;
      font-size: 14px;
    }

    .span2 {
      margin-left: 10px;
      display: flex;
      width: 100%;

      .attendance1 {
        width: 45px;
        height: 45px;
        background: url('@/assets/images/blueM.png') 0 bottom no-repeat;
        background-size: 100% 100%;

      }

      .attendance2 {
        width: 45px;
        height: 45px;
        background: url('@/assets/images/greenM.png') 0 bottom no-repeat;
        background-size: 100% 100%;
      }

      .span {
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}

.iframeClassMin {
  position: absolute;
  bottom: 5px;
  left: 5px;
  width: 1920px;
  height: 1080px;
  transform: scale(0.17, 0.19); /* 缩放比例 */
  transform-origin: bottom left; /* 缩放的起点 */
}

.iframeClassMax {
  position: absolute;
  z-index: 99;
  bottom: 210px;
  left: 355px;
  width: 1920px;
  height: 1080px;
  transform: scale(0.63, 0.63); /* 缩放比例 */
  transform-origin: bottom left; /* 缩放的起点 */
}

.iframeBox {
  position: absolute;
  top: 160px;
  left: 355px;
  width: 1210px;
  height: 30px;
  background-color: #dbe1e7;
  border-radius: 5px 5px 0 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .icon {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a5a9ae;
  }

  .icon:hover {
    border-radius: 0 5px 0 0;
    background-color: #c71e1e;
    color: #FFFFFF;
  }
}
</style>