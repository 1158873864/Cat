<template>
  <el-card
    shadow="hover"
    style="border-top: #24CE6E 1px solid; margin: 10px;height: 90vh"
    v-loading="detailLoading"
    element-loading-text="Loading"
  >
    <div slot="header" class="clearfix el-row--flex">
      <div class="green-point" />
      <span>设备详情 <el-tag
        style="margin-top: -10px; margin-left: 10px"
        :type="detail.status | statusTypeFilter">{{ detail.status | statusTextFilter }}</el-tag></span>
    </div>
    <el-row style="padding: 20px">
      <el-col :span="7" style="padding: 40px 0 0 30px">
        <p><strong>QR Code</strong>: {{ detail.qrcode }}</p>
        <p><strong>位置</strong>: {{ detail.park }} {{ detail.department }} {{ detail.room }}</p>
        <p><strong>编号</strong>: {{ detail.number }}</p>
        <p><strong>PM2.5指数</strong>: {{ detail.pm2_5 }}</p>
        <p><strong>CO2指数</strong>: {{ detail.co2 }}</p>
        <p><strong>温度</strong>: {{ detail.temperature }}°C</p>
        <p><strong>湿度</strong>: {{ detail.humidity }}</p>
      </el-col>
      <el-col :span="16">
        <line-chart
          v-if="detail.haveData"
          :chart-id="'linechart'+detail.qrcode"
          :chart-name="'PM2.5日变化图'"
          :chart-data="detail.chart"
          :y-name="'PM2.5'"
        />
        <failed-chart v-else :name="'PM2.5日变化'"/>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { getDetail } from '../../api/device'
import LineChart from '../../components/LineChart/index'
import FailedChart from '../../components/NoDataChart/index'
import { statusTypeFilter, statusTextFilter } from '../../utils/filters'

export default {
  name: 'Detail',
  components: { FailedChart, LineChart },
  data() {
    return {
      detailLoading: true,
      detail: {}
    }
  },
  filters: {
    statusTypeFilter,
    statusTextFilter
  },
  mounted() {
    const deviceId = this.$route.query.id
    getDetail(deviceId).then(response => {
      this.detail = response
      this.detailLoading = false
    }).catch(() => {
      this.detailLoading = false
    })
  }
}
</script>

<style scoped>
  p {
    margin-bottom: 20px;
  }
</style>
