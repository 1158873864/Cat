<template>
  <el-card shadow="hover" style="width: 97%; margin-bottom: 3%;border-top: #24CE6E 1px solid">
    <div slot="header" class="clearfix el-row--flex">
      <div class="green-point"></div>
      <span>{{chartName}}</span>
    </div>
    <div :id="chartId" style="width: 500px;height:320px;"></div>
  </el-card>
</template>

<script>
export default {
  name: 'PieChart',
  props: {
    chartId: String,
    chartName: String,
    data: Array,
    dataName: String
  },
  mounted() {
    this.drawPieChart()
  },
  methods: {
    drawPieChart() {
      const pieChart = this.$echarts.init(document.getElementById(this.chartId))
      const options = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: 5,
          left: 'center',
          data: this.data.map(obj => obj.name)
        },
        color: ['#749f83', '#91c7ae', '#bda29a', '#d48265', '#c23531', '#2f4554'],
        series: [
          {
            name: this.dataName,
            type: 'pie',
            radius: ['30%', '55%'],
            center: ['50%', '45%'],
            data: this.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      pieChart.setOption(options)
    }
  }
}
</script>

<style scoped>
  .green-point {
    margin: 5px 10px 0 0;
    width:8px;
    height:8px;
    background:rgba(36,206,110,1);
    border-radius:50%;
  }
</style>
