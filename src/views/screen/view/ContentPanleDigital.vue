<template>
  <div class="content-panle">
    <!-- 左边 -->
    <div class="content-panle-left">
      <panle-box box-height="300px" title="Project Introduction">
        <div class="digital-introduction">
          <div class="introduction_text">
            <div class="scroll-content">{{ introduction_text }}</div>
          </div>
        </div>
      </panle-box>
      <panle-box box-height="300px" title="Staff Structure">
        <div class="digital-staff">
          <div class="staff_chart_box">
            <div id="chart1" class="staff_chart"></div>
          </div>
        </div>
      </panle-box>
      <panle-box title="Toolbox Meeting">
        <div class="digital-meeting panle-public-zbxx">
          <div class="public-zbxx-title">
            <span style="flex:0 0 160px;">Application Time</span>
            <span>Title</span>
          </div>
          <div style="overflow:auto;height:90%;">
            <div v-for="(item, index) in TBMlist" :key="'meeting' + index" class="public-zbxx-box">
              <div class="public-zbxx-cell">
                <span style="flex:0 0 160px;">{{ item.application_time }}</span>
                <span :title="item.title" @click="showPdf(item)">{{ item.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </panle-box>
    </div>

    <!-- 右边 -->
    <div class="content-panle-right">
      <panle-box box-height="260px" title="Overview Video">
        <div class="digital-video">
          <div class="video">
            <hkvs-box></hkvs-box>
          </div>
          <div class="title">
            <span class="span1"></span>
            <el-select v-model="hkwsIp" class="panle-public-select" placeholder="请选择" popper-class="mySelectStyle"
                       style="width: 200px">
              <el-option
                  v-for="item in hkwsArr"
                  :key="item.ip"
                  :label="item.devieName"
                  :value="item.ip"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </panle-box>
      <panle-box box-height="400px" title="Quality & Safety Status">
        <div class="digital-safety">
          <div class="safety_chart">
            <div class="chart-data">
              <div class="openPTW" @click="openPTW"></div>
              <el-radio v-model="radio" label="1" @input="changeChartData">By Daily</el-radio>
              <el-radio v-model="radio" label="2" @input="changeChartData">By Monthly</el-radio>
            </div>
            <div class="change-l"><i class="el-icon-caret-left" @click="changeChart()"></i></div>
            <div id="chart2" class="chart_1"></div>
            <div class="change-r"><i class="el-icon-caret-right" @click="changeChart()"></i></div>
          </div>
        </div>
        <div class="clltj-ct2">
          <div class="clltj-ct2-box">
            <span class="span1" style="margin-top: 20px">Disposal Rate</span>
            <span class="span2" style="margin-top: 12px">{{ DisposalRate }}%</span>
            <span class="color1"></span>
          </div>
          <div class="clltj-ct2-box">
            <span class="span1">Average Approved Time</span>
            <span class="span2">3.5h</span>
            <span class="color4"></span>
          </div>
          <div class="clltj-ct2-box">
            <span class="span1">Average Closed Time</span>
            <span class="span2">27.5h</span>
            <span class="color6"></span>
          </div>
        </div>
      </panle-box>
      <panle-box box-height="270px" title="Weather Forecast">
        <div class="digital-weather">
          <div class="panle-public-title equal-width">
						<span v-for="(item,index) in forecasts" :key="`tqybtitle${index}`"
                  :class="['public-title-cell',{'on':forecastIndex===index}]"
                  @click="forecastClick(index)">{{ $moment(item.timestamp).format('MM-DD') }}</span>
          </div>
          <div class="weather-ct">
            <template v-for="(item,index) in forecasts">
              <div v-if="forecastIndex===index" :key="`tqyb${index}`" class="weather-ct-box">
                <div class="ct-box-cell">
                  <div class="ct-box-cell-l">
                    <img alt="" src="@/assets/screenimages/screen-digital15-1.png"/>
                  </div>
                  <div class="ct-box-cell-r">
                    <span class="span1">Weather</span>
                    <span class="span2">{{ item.forecast.text }}</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="weather_box">
            <div class="hjqk-box">
              <div class="hjqk-box-l">
                <img alt="" src="../../../assets/screenimages/screen-digital10.png"/>
              </div>
              <div class="hjqk-box-r">
                <span class="span1">Wind Force</span>
                <span class="span2">{{
                    getRange(forecasts[forecastIndex].wind.speed.low, forecasts[forecastIndex].wind.speed.high)
                  }}<i>km/h</i></span>
              </div>
            </div>
            <div class="hjqk-box">
              <div class="hjqk-box-l">
                <img alt="" src="../../../assets/screenimages/screen-digital11.png"/>
              </div>
              <div class="hjqk-box-r">
                <span class="span1">Wind Direction</span>
                <span class="span2">{{ forecasts[forecastIndex].wind.direction }}</span>
              </div>
            </div>
            <div class="hjqk-box">
              <div class="hjqk-box-l">
                <img alt="" src="../../../assets/screenimages/screen-digital13-1.png"/>
              </div>
              <div class="hjqk-box-r">
                <span class="span1">Temperature</span>
                <span class="span2">{{
                    getRange(forecasts[forecastIndex].temperature.low, forecasts[forecastIndex].temperature.high)
                  }}<i>℃</i></span>
              </div>
            </div>
            <div class="hjqk-box">
              <div class="hjqk-box-l">
                <img alt="" src="../../../assets/screenimages/screen-digital13-2.png"/>
              </div>
              <div class="hjqk-box-r">
                <span class="span1">Humidity</span>
                <span class="span2">{{
                    getRange(forecasts[forecastIndex].relativeHumidity.low, forecasts[forecastIndex].relativeHumidity.high)
                  }}<i>%</i></span>
              </div>
            </div>
          </div>
        </div>
      </panle-box>
    </div>

    <!-- 下 -->
    <bottom-panle></bottom-panle>

    <panle-file-tbox
        v-if="pdfFlag"
        :data="pdfData"
        @panleFileTboxClose="pdfFlag = false;"
    ></panle-file-tbox>

    <div v-if="ptwFlag" class="ptwList">
      <div class="title">
        <div class="icon" @click="closePtwlist">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="panle-public-zbxx">
        <div class="public-zbxx-title">
          <span style="flex:0 0 160px;">Time</span>
          <span style="flex:0 0 160px;">Title</span>
          <span style="flex:0 0 180px;">Name</span>
          <span style="flex:0 0 400px;">Company</span>
          <span style="flex:0 0 200px;">Type</span>
          <span>Status</span>
        </div>
        <div style="overflow:auto;height:90%;">
          <div v-for="(item, index) in ptwlist" :key="'pwt' + index" class="public-zbxx-box">
            <div class="public-zbxx-cell">
              <span style="flex:0 0 160px;">{{ item.time }}</span>
              <span style="flex:0 0 160px;cursor: pointer" @click="openPdf(item)">{{ item.title }}</span>
              <span style="flex:0 0 180px;">{{ item.apply_user_name }}</span>
              <span style="flex:0 0 400px;">{{ item.company }}</span>
              <span style="flex:0 0 200px;">{{ item.type }}</span>
              <span>{{ item.status_name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PanleBox from "@/components/PanleBox.vue";
import * as echarts from "echarts";
import BottomPanle from "@/views/screen/view/BottomPanle.vue";
import PanleFileTbox from "@/components/PanleFileTbox.vue";
import HlsVideo from "@/components/HlsVideo.vue";
import {
  getDisposalRate, getPTWlist, getPTWReview, getPTWWorkflow,
  getPWTStatus,
  getPWTType,
  getTBMlist, getTBMPReview,
  getTBMWorkflow,
} from "@/apis/getData";
import axios from "axios";
import HkvsBox from "@/components/hkwsBox.vue";

export default {
  components: {
    HkvsBox,
    HlsVideo,
    PanleFileTbox,
    BottomPanle,
    PanleBox
  },
  watch: {
    PWTStatus: {
      handler: function (newVal, oldVal) {
        if (newVal) {
          this._progressChart()
        }
      },
      deep: true,
      immediate: true
    },
    PWTType: {
      handler: function (newVal, oldVal) {
        if (newVal) {
          this._progressChart2()
        }
      },
      deep: true,
      immediate: true
    },
    hkwsFlag1: {
      handler: function (newVal, oldVal) {
        if (newVal && this.hkwsFlag2) {
          this.hkwsIp = this.hkwsArr[0].ip
          this.playhkws()
        }
      },
      deep: true,
      immediate: true
    },
    hkwsFlag2: {
      handler: function (newVal, oldVal) {
        if (newVal && this.hkwsFlag1) {
          this.hkwsIp = this.hkwsArr[0].ip
          this.playhkws()
        }
      },
      deep: true,
      immediate: true
    },
    hkwsIp: {
      handler: function (newVal, oldVal) {
        if (newVal && this.hkwsFlag1 && this.hkwsFlag2) {
          this.playhkws()
        }
      },
      deep: true,
      immediate: true
    },
  },
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
    },
    hkwsIp: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      DisposalRate: 0,
      intervalId: null,
      chart_flag: false,
      ptwFlag: false,
      ptwlist: [
        {
          short_type: "",
          status: "",
          time: "",
          title: "",
          company: "",
          status_name: "",
          type: "",
          apply_id: "",
          apply_user_name: ""
        }
      ],
      radio: '1',
      //项目介绍
      introduction_text: 'CR109 Contract consists of design and construction of Tampines North Station, Cut & Cover tunnel, Cut & Cover shafts structure and east twin bored tunnels (in Pasir Ris Drive 1) & west twin Bored Tunnel (in Tampines Industrial Avenue 2).',
      //会议进度
      TBMlist: [
        {
          application_time: "",
          title: "",
          meeting_id: "",
        },
      ],
      pdfData: {
        id: '',
        url: '',
        title: '',
        steps: [
          {
            detail: "",
          },
          {
            detail: "",
          },
        ],
        type: '',
        pwt: [
          {
            user_name: ''
          }
        ],
      },
      pdfFlag: false,

      forecastIndex: 0,
      forecasts: [
        {
          "temperature": {"low": 24, "high": 33, "unit": "Degrees Celsius"},
          "relativeHumidity": {"low": 60, "high": 95, "unit": "Percentage"},
          "forecast": {"code": "TL", "text": "Thundery Showers"},
          "validPeriod": {
            "start": "2025-05-12T12:00:00+08:00",
            "end": "2025-05-12T12:00:00+08:00",
            "text": "12 PM 8 May to 12 PM 9 May"
          },
          "wind": {"speed": {"low": 5, "high": 15}, "direction": "WSW"}
        },
        {
          "temperature": {"low": 23, "high": 34, "unit": "Degrees Celsius"},
          "relativeHumidity": {"low": 60, "high": 95, "unit": "Percentage"},
          "forecast": {"summary": "Morning thundery showers ", "code": "TL", "text": "Thundery Showers"},
          "day": "Friday",
          "timestamp": "2025-05-13T00:00:00+08:00",
          "wind": {"speed": {"low": 5, "high": 20}, "direction": "WSW"}
        },
        {
          "temperature": {"low": 23, "high": 34, "unit": "Degrees Celsius"},
          "relativeHumidity": {"low": 60, "high": 95, "unit": "Percentage"},
          "forecast": {"summary": "Morning thundery showers ", "code": "TL", "text": "Thundery Showers"},
          "day": "Saturday",
          "timestamp": "2025-05-14T00:00:00+08:00",
          "wind": {"speed": {"low": 10, "high": 25}, "direction": "WSW"}
        },
        {
          "temperature": {"low": 23, "high": 34, "unit": "Degrees Celsius"},
          "relativeHumidity": {"low": 60, "high": 95, "unit": "Percentage"},
          "forecast": {
            "summary": "Pre-dawn and early morning thundery showers",
            "code": "TL",
            "text": "Thundery Showers"
          },
          "day": "Sunday",
          "timestamp": "2025-05-15T00:00:00+08:00",
          "wind": {"speed": {"low": 10, "high": 20}, "direction": "WSW"}
        },
        {
          "temperature": {"low": 23, "high": 34, "unit": "Degrees Celsius"},
          "relativeHumidity": {"low": 60, "high": 95, "unit": "Percentage"},
          "forecast": {
            "summary": "Pre-dawn and early morning thundery showers ",
            "code": "TL",
            "text": "Thundery Showers"
          },
          "day": "Monday",
          "timestamp": "2025-05-16T00:00:00+08:00",
          "wind": {"speed": {"low": 10, "high": 20}, "direction": "SSW"}
        }
      ],

      PWTStatus: {
        day: [],
        month: []
      },
      PWTType: {
        day: [],
        month: []
      },
      color: [
        '#2caefc',
        '#534ec3',
        '#00e071',
        '#fc6935',
        '#6a89bb',
        '#d367f9',
        '#2edec8',
        '#f84a41',
        '#fcb469',
        '#90e6df',
      ],
    };
  },
  mounted() {
    this._getDisposalRate()
    this._getPWTStatus('day')
    this._getPWTStatus('month')
    this._getPWTType('day')
    this._getPWTType('month')
    this._getTBMlist({
      pageIndex: 1, pageSize: 20
    })
    this._getPTWlist({
      pageIndex: 1, pageSize: 20
    })
    this._progressChart()
    this._progressChart2()
    this.intervalId = setInterval(this.changeChart, 10000);
    this.fetchWeatherData1()
    this.$emit('login', 0)
  },
  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      console.log('轮询已停止');
    }
    this.hidPlugin()
  },
  created() {
    // this.showPlugin()
  },
  methods: {
    destroyPlugin() {
      WebVideoCtrl.I_DestroyPlugin().then(() => {
      }).catch(() => {
      })
    },
    showPlugin() {
      WebVideoCtrl.I_ShowPlugin().then(() => {
      }).catch(() => {
      })
    },
    hidPlugin() {
      WebVideoCtrl.I_HidPlugin().then(() => {
      }).catch(() => {
      })
    },
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
      console.log(_this.hkwsArr[index])
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

    changeChart() {
      if (this.chart_flag) {
        this._progressChart2()
        if (this.intervalId) {
          clearInterval(this.intervalId);
          console.log('轮询已重置');
          this.intervalId = setInterval(this.changeChart, 10000);
        }
      } else {
        this._progressChart3()
        if (this.intervalId) {
          clearInterval(this.intervalId);
          console.log('轮询已重置');
          this.intervalId = setInterval(this.changeChart, 10000);
        }
      }
      this.chart_flag = !this.chart_flag
    },
    changeChartData() {
      if (this.chart_flag) {
        this._progressChart3()
        if (this.intervalId) {
          clearInterval(this.intervalId);
          console.log('轮询已重置');
          this.intervalId = setInterval(this.changeChart, 10000);
        }
      } else {
        this._progressChart2()
        if (this.intervalId) {
          clearInterval(this.intervalId);
          console.log('轮询已重置');
          this.intervalId = setInterval(this.changeChart, 10000);
        }
      }
    },
    //展示pdf
    showPdf(item) {
      this.pdfFlag = false;
      this.pdfData.title = item.title
      this.pdfData.id = item.meeting_id
      this.pdfData.type = 'Meeting'
      this._getTBMReview(item.meeting_id)
      this._getTBMWorkflow(item.meeting_id)
      this.pdfFlag = true;
    },
    //人员图表
    _progressChart() {
      let dom = document.getElementById("chart1");
      if (!dom) {
        return;
      }
      let progressChart = echarts.init(dom);
      let option = {
        tooltip: {
          trigger: 'item'
        },
        grid: {
          top: "20%", // 增加这个值来减小上方的空白
          left: "1%",
          right: "1%",
          bottom: "5%",
        },
        legend: {
          orient: 'horizontal', // 修改为水平排列
          bottom: '0%',        // 将图例放置在底部
          left: 'center',      // 将图例水平居中
          textStyle: {          // 设置图例文字样式
            color: '#ffffff',   // 修改为您希望的颜色
            fontSize: 12,        // 字体大小 (可选)
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '60%',
            center: ['45%', '40%'],
            data: [
              {value: 62, name: 'Management Personnel'},
              {value: 617, name: 'Worker'},
            ],
            label: {
              show: true,
              formatter: '{b}: {c} ({d}%)',
              textStyle: {
                color: '#ffffff',
                fontSize: 14,
                stroke: null,
                fontWeight: 'normal'
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                backgroundColor: 'transparent' // 取消背景颜色
              }
            }
          }
        ]
      };
      progressChart.setOption(option);
    },
    _progressChart2() {
      let data0 = []
      let total = 0
      let legendData = []

      let data1 = [
        {value: 2, name: 'Closed', itemStyle: {color: '#258a2f'}},
        {value: 39, name: 'Approved', itemStyle: {color: '#29c739'}},
        {value: 5, name: 'Submitted', itemStyle: {color: '#518cca'}},
        {value: 5, name: 'Rejected/Revoked', itemStyle: {color: '#ba2929'}},
      ]
      let data2 = [
        {value: 528, name: 'Closed', itemStyle: {color: '#258a2f'}},
        {value: 153, name: 'Approved', itemStyle: {color: '#29c739'}},
        {value: 12, name: 'Submitted', itemStyle: {color: '#518cca'}},
        {value: 19, name: 'Rejected/Revoked', itemStyle: {color: '#ba2929'}},
      ]
      data1 = this.updateData(data1, this.PWTStatus.day)
      data2 = this.updateData(data2, this.PWTStatus.month)

      let top4LegendData = ['Closed', 'Approved', 'Submitted', 'Rejected/Revoked'];
      if (this.radio === '1') {
        data0 = data1
        total = data1.reduce((sum, item) => sum + item.value, 0);
      } else {
        data0 = data2
        total = data2.reduce((sum, item) => sum + item.value, 0);
      }

      let dom = document.getElementById("chart2");
      if (!dom) {
        return;
      }
      let progressChart = echarts.init(dom);
      let option = {
        title: {
          text: 'PTW Status',
          left: 'left',
          top: 5,
          textStyle: {
            color: '#ffffff',
          },
          subtext: '',
          subtextStyle: {
            color: '#ffffff',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            // 计算总数
            const total = option.series[0].data.reduce((sum, item) => sum + item.value, 0);
            // 计算当前项的百分比
            const percentage = ((params.value / total) * 100).toFixed(2);
            // 返回自定义的提示框内容
            return `${params.name}<br/>Num: ${params.value} (${percentage}%)`;
          }
        },
        legend: {
          orient: 'vertical',
          bottom: 20,
          left: 0,
          icon: 'circle', // 图例图标样式
          textStyle: {
            color: '#ffffff',
            fontSize: 12
          },
          data: top4LegendData
        },
        graphic: [
          {
            type: 'text',
            left: '52%',
            top: '50%',
            style: {
              text: `Total:${total}`,
              textAlign: 'center',
              fontSize: 12,
              fill: '#ffffff'
            }
          }
        ],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['30%', '55%'],
            center: ['60%', '52%'],
            itemStyle: {
              borderRadius: 5,
              borderColor: '#ffffff00',
              borderWidth: 2
            },
            label: {
              show: true,
              textStyle: {
                color: '#ffffff',
                fontSize: 14,
                stroke: null,
                fontWeight: 'normal'
              }
            },
            data: data0,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      progressChart.setOption(option);
    },
    _progressChart3() {
      let data0 = []
      let total = 0
      let legendData = []

      let data1 = [
        {value: 9, name: 'Lifting Operation', itemStyle: {color: '#2caefc'}},
        {value: 9, name: 'Hot Work', itemStyle: {color: '#534ec3'}},
        {value: 9, name: 'Lifting Works (Crawler Crane)', itemStyle: {color: '#00e071'}},
        {value: 8, name: 'Working At Height', itemStyle: {color: '#fc6935'}},
        {value: 7, name: 'Confined Space', itemStyle: {color: '#6a89bb'}},
        {value: 2, name: 'Excavation', itemStyle: {color: '#d367f9'}},
        {value: 2, name: 'Piling', itemStyle: {color: '#2edec8'}},
        {value: 2, name: 'Ladder', itemStyle: {color: '#f84a41'}},
        {value: 1, name: 'Lifting Works (Gantry Crane)', itemStyle: {color: '#fcb469'}},
        {value: 1, name: 'MEWP', itemStyle: {color: '#90e6df'}},
        {value: 1, name: 'General', itemStyle: {color: '#2caefc'}},
      ]
      let data2 = [
        {value: 163, name: 'Working At Height', itemStyle: {color: '#2caefc'}},
        {value: 158, name: 'Hot Work', itemStyle: {color: '#534ec3'}},
        {value: 125, name: 'Confined Space', itemStyle: {color: '#00e071'}},
        {value: 88, name: 'Lifting Operation', itemStyle: {color: '#fc6935'}},
        {value: 73, name: 'Lifting Works (Crawler Crane)', itemStyle: {color: '#6a89bb'}},
        {value: 34, name: 'Piling', itemStyle: {color: '#d367f9'}},
        {value: 23, name: 'Excavation', itemStyle: {color: '#2edec8'}},
        {value: 23, name: 'Lifting Works (Gantry Crane)', itemStyle: {color: '#f84a41'}},
        {value: 11, name: 'Gantry', itemStyle: {color: '#fcb469'}},
        {value: 7, name: 'MEWP', itemStyle: {color: '#90e6df'}},
        {value: 3, name: 'Lifting Works (Mobile Crane)', itemStyle: {color: '#2caefc'}},
        {value: 2, name: 'Ladder', itemStyle: {color: '#534ec3'}},
        {value: 2, name: 'Lifting Works (Lorry Crane)', itemStyle: {color: '#00e071'}},
      ]
      data1 = this.processAndMergeData(data1, this.PWTType.day, this.color)
      data2 = this.processAndMergeData(data2, this.PWTType.month, this.color)

      let top4LegendData = ['Hot Work', 'Confined Space', 'Lifting Operation', 'Working At Height'];

      if (this.radio === '1') {
        data0 = data1
        total = data1.reduce((sum, item) => sum + item.value, 0);
      } else {
        data0 = data2
        total = data2.reduce((sum, item) => sum + item.value, 0);
      }

      let dom = document.getElementById("chart2");
      if (!dom) {
        return;
      }
      let progressChart = echarts.init(dom);
      let option = {
        title: {
          text: 'PTW Type',
          left: 'left',
          top: 5,
          textStyle: {
            color: '#ffffff',
          },
          subtext: '',
          subtextStyle: {
            color: '#ffffff',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            // 计算总数
            const total = option.series[0].data.reduce((sum, item) => sum + item.value, 0);
            // 计算当前项的百分比
            const percentage = ((params.value / total) * 100).toFixed(2);
            // 返回自定义的提示框内容
            return `${params.name}: ${params.value} (${percentage}%)`;
          }
        },
        legend: {
          // type: 'scroll', // 设置为滚动类型
          orient: 'vertical',
          bottom: 20,
          left: 0,
          icon: 'circle', // 图例图标样式
          textStyle: {
            color: '#ffffff',
            fontSize: 12
          },
          data: top4LegendData
        },
        graphic: [
          {
            style: {
              text: ``,
            }
          }
        ],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['30%', '60%'],
            center: ['60%', '52%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
            },
            data: data0,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      progressChart.setOption(option);
    },
    // 获取温度或风力范围
    getRange(a, b) {
      if (a > b) {
        return `${b}-${a}`
      } else {
        return `${a}-${b}`
      }
    },
    // 天气预报
    forecastClick(index) {
      this.forecastIndex = index
    },
    async fetchWeatherData2() {
      try {
        const response = await axios.get(
            'https://api-open.data.gov.sg/v2/real-time/api/four-day-outlook'
        );
        this.forecasts.push(...response.data.data.records[0].forecasts);
      } catch (error) {
        return false
      }
    },
    async fetchWeatherData1() {
      try {
        const response = await axios.get(
            'https://api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast'
        );
        this.forecasts = []
        this.forecasts.push(response.data.data.records[0].general);
        await this.fetchWeatherData2()
      } catch (error) {
        return false
      }
    },

    _getPWTStatus(params) {
      getPWTStatus({
        timeUnit: params
      }).then(res => {
        if (res) {
          this.PWTStatus[params] = res
        }
      }).catch(err => {
      })
    },
    _getPWTType(params) {
      getPWTType({
        timeUnit: params
      }).then(res => {
        if (res) {
          this.PWTType[params] = res
        }
      }).catch(err => {
      })
    },
    updateData(data, updateData) {
      // 创建一个对象字典，以 name 为键，快速查找对应的 value
      const updateDict = updateData.reduce((acc, item) => {
        acc[item.name] = parseInt(item.value, 10); // 将 value 转换为数字
        return acc;
      }, {});

      // 遍历基础数据，更新对应的 value
      return data.map(item => {
        if (updateDict[item.name] !== undefined) {
          return {
            ...item,
            value: updateDict[item.name]
          };
        }
        return item;
      });
    },
    processAndMergeData(baseData, returnData, colorArray) {
      // 1. 将返回数据转换为字典，方便快速查找
      const returnDataMap = returnData.reduce((acc, item) => {
        acc[item.name] = parseInt(item.value, 10);
        return acc;
      }, {});

      // 2. 筛选基础数据，只保留与返回数据匹配的项目
      const filteredBaseData = baseData.filter(item => returnDataMap[item.name] !== undefined);

      // 3. 添加返回数据中不在基础数据中的新项目
      const newData = returnData.filter(item => !baseData.some(baseItem => baseItem.name === item.name))
          .map(item => ({
            value: parseInt(item.value, 10),
            name: item.name
          }));

      // 4. 合并数据并排序
      const mergedData = [...filteredBaseData, ...newData]
          .sort((a, b) => b.value - a.value);

      // 5. 分配颜色并添加 itemStyle 属性
      return mergedData.map((item, index) => {
        const colorIndex = index % colorArray.length;
        return {
          ...item,
          value: item.value || 0,
          itemStyle: {
            color: colorArray[colorIndex]
          }
        };
      });
    },

    _getTBMlist(params) {
      getTBMlist(params).then(res => {
        if (res) {
          this.TBMlist = res
        }
      }).catch(err => {
      })
    },
    _getTBMReview(params) {
      getTBMPReview({
        meetingId: params
      }).then(res => {
        if (res) {
          this.pdfData.url = res
        }
      }).catch(err => {
      })
    },
    _getTBMWorkflow(params) {
      getTBMWorkflow({
        meetingId: params
      }).then(res => {
        if (res) {
          this.pdfData.steps = res
        }
      }).catch(err => {
      })
    },

    openPTW() {
      this.ptwFlag = true
    },
    closePtwlist() {
      this.ptwFlag = false
      this.pdfFlag = false
    },
    openPdf(item) {
      this.pdfFlag = false;
      this.pdfData.title = item.title
      this.pdfData.id = item.apply_id
      this.pdfData.type = 'PTW'
      this._getPTWReview(item.apply_id)
      this._getPTWWorkflow(item.apply_id)
      this.pdfFlag = true;
    },
    _getPTWlist(params) {
      getPTWlist(params).then(res => {
        if (res) {
          this.ptwlist = res
        }
      }).catch(err => {
      })
    },
    _getPTWReview(params) {
      getPTWReview({
        applyId: params
      }).then(res => {
        if (res) {
          this.pdfData.url = res
        }
      }).catch(err => {
      })
    },
    _getPTWWorkflow(params) {
      getPTWWorkflow({
        applyId: params
      }).then(res => {
        if (res) {
          this.pdfData.pwt = res
        }
      }).catch(err => {
      })
    },

    _getDisposalRate() {
      getDisposalRate().then(res => {
        if (res) {
          this.DisposalRate = res
        }
      }).catch(err => {
      })
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/screen";

.pdf-popover {
  position: absolute;
  left: 400px;
  bottom: 200px;
  width: 600px;
  height: 700px;
}
</style>
<style lang="scss" scoped>
//左
.digital-introduction {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .introduction_text {
    height: 220px;
    overflow: hidden;
    position: relative;
  }

  .scroll-content {
    color: white;
    text-indent: 2em;
    line-height: 20px;
    letter-spacing: 1px;
    position: absolute;
    width: 100%;
    animation: scroll 10s linear infinite; /* 设置滚动动画 */
  }

  @keyframes scroll {
    0% {
      transform: translateY(75%); /* 从底部开始 */
    }
    100% {
      transform: translateY(-70%); /* 向上滚动到顶部 */
    }
  }
}

.digital-staff {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .staff_chart_box {
    width: 310px;
    height: 230px;

    .staff_chart {
      width: 100%;
      height: 100%;
    }
  }
}

.digital-meeting {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

//右
.digital-video {
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

.digital-safety {
  width: 100%;
  height: 230px;
  overflow: hidden;

  .safety_chart {
    width: 310px;
    height: 250px;

    .chart-data {
      display: flex;
      position: absolute;
      right: 0;
      z-index: 10;

      ::v-deep {
        .el-radio {
          margin-right: 20px;
        }

        .el-radio__label {
          color: #FFFFFF;
        }

        .el-radio__input.is-checked + .el-radio__label {
          color: #1890ff;
        }
      }

      .openPTW {
        height: 35px;
        width: 130px;
        margin-right: 20px;
        cursor: pointer;
      }
    }

    .chart_1 {
      position: absolute;
      top: 320px;
      width: 100%;
      height: 270px;
      z-index: 9;
    }

    .change-l {
      position: absolute;
      left: 0;
      top: 430px;
      z-index: 10;
      color: #06c3ec80;
      font-size: 30px;
      display: flex;
      width: 35px;
      height: 35px;
      justify-content: center;
      align-items: center;

      &:hover {
        font-size: 32px;
        color: #06c3ec;
        cursor: pointer;
      }
    }

    .change-r {
      position: absolute;
      right: 0;
      top: 430px;
      z-index: 10;
      color: #06c3ec80;
      font-size: 30px;
      display: flex;
      width: 35px;
      height: 35px;
      justify-content: center;
      align-items: center;

      &:hover {
        font-size: 32px;
        color: #06c3ec;
        cursor: pointer;
      }
    }
  }
}

.digital-weather {
  //margin-top: 10px;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .weather-ct {
    height: 60px;
    width: 100%;
    overflow: hidden;

    .weather-ct-box {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      overflow: hidden;
      flex-wrap: wrap;

      .ct-box-cell {
        height: 50px;
        //padding: 10px 0;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        column-gap: 8px;

        .ct-box-cell-l {
          width: 36px;
          height: 32px;
          overflow: hidden;

          img {
            display: block;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }
        }

        .ct-box-cell-r {
          .span1 {
            display: block;
            color: #ffffff;
            line-height: 18px;
            font-size: 14px;
          }

          .span2 {
            margin-top: 5px;
            display: block;
            color: #3FBAFC;
            line-height: 18px;
            font-weight: bold;
            font-size: 16px;

            i {
              display: inline-block;
              vertical-align: middle;
              font-weight: normal;
              font-style: normal;
              font-size: 12px;
              margin: 0 0 2px 3px;
            }
          }
        }
      }
    }

    .weather-ct-box1 {
      width: 100%;
      height: 100px;
      overflow-x: hidden;
      overflow-y: auto;

      .ct-box1-cell {
        width: 100%;
        padding: 5px 10px;
        margin-bottom: 5px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        &.color1 {
          background: url('@/assets/screenimages/screen-digital16-1.png') 0 0 no-repeat;
          background-size: 100% 100%;

          .span1 {
            background: url('@/assets/screenimages/screen-digital17-1.png') center center no-repeat;
            background-size: 14px 14px;
          }
        }

        &.color2 {
          background: url('@/assets/screenimages/screen-digital16-2.png') 0 0 no-repeat;
          background-size: 100% 100%;

          .span1 {
            background: url('@/assets/screenimages/screen-digital17-2.png') center center no-repeat;
            background-size: 14px 14px;
          }
        }

        &.color3 {
          background: url('@/assets/screenimages/screen-digital16.png') 0 0 no-repeat;
          background-size: 100% 100%;

          .span1 {
            background: url('@/assets/screenimages/screen-digital17.png') center center no-repeat;
            background-size: 14px 14px;
          }
        }

        .span1 {
          width: 26px;
          height: 20px;
        }

        .span2 {
          font-size: 14px;
          color: #ffffff;
          line-height: 20px;
        }
      }
    }
  }

  .weather_box {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .hjqk-box {
      padding: 5px 0 5px 0;
      float: left;
      width: 50%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      column-gap: 10px;

      .hjqk-box-l {
        width: 44px;
        height: 44px;
        overflow: hidden;

        img {
          display: block;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
      }

      .hjqk-box-r {
        .span1 {
          display: block;
          color: #ffffff;
          line-height: 18px;
          font-size: 14px;
        }

        .span2 {
          margin-top: 5px;
          display: block;
          color: #02FFFE;
          line-height: 18px;
          font-weight: bold;
          font-size: 16px;

          i {
            display: inline-block;
            vertical-align: middle;
            font-weight: normal;
            font-style: normal;
            font-size: 12px;
            margin: 0 0 2px 3px;
          }
        }
      }
    }
  }
}

.ptwList {
  width: 1220px;
  height: 720px;
  position: absolute;
  left: 350px;
  top: 170px;
  z-index: 9;
  border-radius: 20px;
  color: #FFFFFF;
  background: url('@/assets/screenimages/screen-box-bg.png') 0 bottom no-repeat;
  background-size: 100% auto;

  .title {
    width: 1220px;
    height: 30px;
    background-color: #1568be;
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

  video {
    width: 1400px;
    height: 787px;
  }
}
</style>