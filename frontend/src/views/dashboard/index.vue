<template>
  <div class="dashboard-container" v-loading="dashboardLoading" element-loading-text="Loading">
    <div v-if="appId === '' && !dashboardLoading" style="margin-top: 30vh; text-align: center">
      <img src="@/assets/not-bind-pic.png" alt="not-bind-pic"/>
      <p class="promt">您当前尚未绑定AppID, <el-button type="text">
        <router-link to="/appId/bind">去绑定</router-link></el-button></p>
    </div>
    <div v-else-if="appId !== '' && !homeInfo.length && !dashboardLoading" style="margin-top: 30vh; text-align: center">
      <img src="@/assets/fail.png" alt="fail-pic"/>
      <p class="promt">数据获取失败，请稍后再试</p>
    </div>
    <el-row v-else>
      <el-col v-for="(chart, index) in homeInfo" :key="index" :span="12">
        <pie-chart :chart-id="'chart'+index" :chart-name="chart.chartname" :data="chart.data" :data-name="'范围'"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PieChart from '../../components/PieChart/index'
import { getHomeInfo } from '../../api/dashboard'

export default {
  name: 'Dashboard',
  components: { PieChart },
  computed: {
    ...mapGetters([
      'appId'
    ])
  },
  data() {
    return {
      dashboardLoading: true,
      homeInfo: {}
    }
  },
  mounted() {
    getHomeInfo().then(response => {
      this.homeInfo = response
      this.dashboardLoading = false
    }).catch(() => {
      this.dashboardLoading = false
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 20px;
    height: 90vh;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
