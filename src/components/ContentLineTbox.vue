<template>
  <div ref="mychart" class="tbox-ct-cell"></div>
</template>

<script>
import * as echarts from "echarts";
import {getEnvironmentData, getGasrecordline} from "@/apis/getData";

export default {
  props: {
    environmentData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    initLineData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      lineData: this.initLineData,
      lineTimer: null,
      lineChart: null,
      lineOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: "line",
          },
        },
        grid: {
          top: '10%',
          left: '5%',
          right: '15%',
          bottom: '5%',
          containLabel: true
        },
        legend: {
          data: ['InLine', 'OutLine'],
          textStyle: {
            color: "#FFFFFF",
            fontSize: 18,
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: '#ffffff',
            fontSize: '12px',
            rotate: -45, // 旋转45度
            margin: 10, // 调整标签与轴线的间距
          },
          axisTick: {
            show: false,
          },
          data: []
        },
        yAxis: {
          type: 'value',
          name: "",
          nameTextStyle: { // 设置名称的样式
            color: '#02FFFE', // 颜色
            fontSize: 18, // 字体大小
            fontWeight: 'bold' // 字体粗细
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff",
            }
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: "#fff",
            }
          },
          axisLabel: {
            color: '#ffffff',
            fontSize: '16px'
          },
          min: 0,
          max: 0
        },
        series: [],
        /* dataZoom: [{
          type: 'inside',
          start:0,
          end:10
        }] */
      }
    }
  },
  mounted() {
    let lineDom = this.$refs.mychart;
    this.lineChart = echarts.init(lineDom);
    this._getData(); //循环调用折线图数据，删除第一个点，添加新调用的最新时间的最后一个点；
  },
  destroyed() {
    clearTimeout(this.lineTimer);
    this.lineTimer = null;
  },
  methods: {
    // 关闭弹窗
    tboxClose() {
      this.$emit('tboxClose', false);
    },
    // 生成数据
    _getData() {
      getGasrecordline({
        type: this.environmentData.key
      }).then(res => {
        if (Object.keys(this.lineData).length === 0)
          this.lineData = res
        else {
          this.lineData.tunnel2_R350.splice(0, 1);
          this.lineData.tunnel_1_R359.splice(0, 1);
          this.lineData.tunnel2_R350.push(res.tunnel2_R350[res.tunnel2_R350.length - 1]);
          this.lineData.tunnel_1_R359.push(res.tunnel_1_R359[res.tunnel_1_R359.length - 1]);
        }
        this._drawLine(); //画折线图；
        if (this.lineTimer) {
          clearTimeout(this.lineTimer);
        }
        this.lineTimer = setTimeout(() => {
          this._getData();
        }, 1 * 1000)
      }).catch(err => {
        if (this.lineTimer) {
          clearTimeout(this.lineTimer);
        }
        this.lineTimer = setTimeout(() => {
          this._getData();
        }, 1 * 1000)
      })
    },
    // 画折线图
    _drawLine() {
      this.lineOptions.xAxis.data = this.lineData.tunnel_1_R359.map(item => {
        let timearr = item.time ? item.time.split('.') : [];
        return timearr.length > 0 ? timearr[0] : '';
      });
      this.lineOptions.yAxis.name = this.environmentData.util;
      this.lineOptions.yAxis.min = this.environmentData.yMin;
      this.lineOptions.yAxis.max = this.environmentData.yMax;
      this.lineOptions.series = [
        {
          name: "OutLine",
          smooth: true,
          type: 'line',
          data: this.lineData.tunnel_1_R359.map(item => Number(item.value)),
          markLine: {
            data: [{
              name: 'Max',
              yAxis: this.environmentData.max,
              lineStyle: {
                type: 'solid',
                color: '#ff0000'
              }
            }],
          }
        },
        {
          name: "InLine",
          smooth: true,
          type: 'line',
          data: this.lineData.tunnel2_R350.map(item => Number(item.value)),
        }]
      if (this.environmentData.min) {
        this.lineOptions.series[0]['markLine']['data'].push({
          name: 'Min',
          yAxis: this.environmentData.min,
          lineStyle: {
            type: 'solid',
            color: '#FF3636'
          }
        })
      }
      this.lineChart.setOption(this.lineOptions);
    }
  }
}
</script>

<style lang="scss" scoped>
.tbox-ct-cell {
  padding-top: 10px;
  width: 780px;
  height: 500px;
}
</style>