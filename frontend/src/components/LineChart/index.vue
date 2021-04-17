<template>
  <div :style="{ 'height':chartHeight + 'px', 'width': chartWidth + 'px' }">
    <div
      v-if="chartData.length > 0"
      :id="chartId"
      :style="{ 'height':chartHeight + 'px', 'width': chartWidth + 'px' }"
    ></div>
    <no-data-chart v-else :name="chartName"/>
  </div>
</template>

<script>
import NoDataChart from '../NoDataChart/index'
export default {
  name: 'LineChart',
  components: { NoDataChart },
  props: {
    chartHeight: {
      type: Number,
      default: 400
    },
    chartWidth: {
      type: Number,
      default: 800
    },
    chartId: {
      type: String,
      default: 'chart'
    },
    chartName: {
      type: String,
      default: ''
    },
    chartData: {
      type: Array,
      default: null
    },
    yName: {
      type: String,
      default: 'value'
    },
    lineColor: {
      type: String,
      default: '#c23531'
    },
    needDatazoom: {
      type: Boolean,
      default: true
    },
    needFilter: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showChart: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.drawLineChart()
      // this.showChart = true
    }, 1000)
  },
  methods: {
    // change {time: '2020-07-06', value: 6} to ['2020-07-06', 6]
    changeDataFormat(dataList) {
      return dataList.map(row => [row.time, row.value.toFixed(2)])
    },
    drawLineChart() {
      const lineChart = this.$echarts.init(document.getElementById(this.chartId))
      const data = this.needFilter ? this.changeDataFormat(this.chartData) : this.chartData
      const options = {
        title: {
          text: this.chartName,
          left: 'center'
        },
        color: [this.lineColor],
        xAxis: {
          type: 'category',
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          name: this.yName,
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        series: [
          {
            name: this.yName,
            type: 'line',
            data: data
          }
        ]
      }
      if (this.needDatazoom) {
        options.dataZoom = [{
          type: 'inside',
          start: 0,
          end: 100
        }, {
          start: 0,
          end: 100,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }]
      }
      lineChart.setOption(options)
    }
  }
}
</script>

<style scoped>

</style>
