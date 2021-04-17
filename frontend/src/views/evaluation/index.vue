<template>
  <div>
    <div v-if="appId === ''" style="margin-top: 30vh; text-align: center">
      <img src="@/assets/not-bind-pic.png" alt="not-bind-pic"/>
      <p class="prompt">您当前尚未绑定AppID, <el-button type="text">
        <router-link to="/appId/bind">去绑定</router-link></el-button></p>
    </div>
    <div v-else-if="!evaluation" style="margin-top: 30vh; text-align: center">
      <img src="@/assets/fail.png" alt="fail-pic"/>
      <p class="prompt">数据获取失败，请稍后再试</p>
    </div>
    <el-card
      v-else
      shadow="hover"
      class="card-container"
      v-loading="evaluationLoading"
      element-loading-text="Loading">
      <div slot="header" class="clearfix el-row--flex">
        <div class="green-point"></div>
        <span>效率评估</span>
      </div>
      <el-row>
        <el-col :span="16">
          <div class="border-container chart-container">
            <el-button-group>
              <el-button
                size="small"
                @click="changeDay(true)"
                :style="{'background': isOneDay ? '#24CE6E' : '#fff', 'color': !isOneDay ? '#000' : '#fff'}"
              >一 天</el-button>
              <el-button
                size="small"
                @click="changeDay(false)"
                :style="{'background': !isOneDay ? '#24CE6E' : '#fff','color': isOneDay ? '#000' : '#fff'}"
              >七 天</el-button>
            </el-button-group>
            <br>
            <line-chart
              v-show="isOneDay"
              :chart-id="'1day-chart'"
              :chart-name="'日工作时长变化图'"
              :chart-data="evaluation.oneWorkTime"
              :y-name="'工作时长'"
              :need-datazoom="false"
              :chart-width="700"
              :chart-height="380"
              :line-color="'#F7B73A'"
            />
            <line-chart
              v-show="!isOneDay"
              :chart-id="'7days-chart'"
              :chart-name="'周工作时长变化图'"
              :chart-data="evaluation.sevenWorkTime"
              :y-name="'工作时长'"
              :need-datazoom="false"
              :chart-width="700"
              :chart-height="380"
              :line-color="'#F7B73A'"
            />
            <line-chart
              v-show="isOneDay"
              :chart-id="'1day-wind-chart'"
              :chart-name="'日风量变化图'"
              :chart-data="evaluation.oneWind"
              :y-name="'风量'"
              :need-datazoom="false"
              :chart-width="700"
              :chart-height="380"
              :line-color="'#F7B73A'"
            />
            <line-chart
              v-show="!isOneDay"
              :chart-id="'7days-wind-chart'"
              :chart-name="'周风量变化图'"
              :chart-data="evaluation.sevenWind"
              :y-name="'风量'"
              :need-datazoom="false"
              :chart-width="700"
              :chart-height="380"
              :line-color="'#F7B73A'"
            />
          </div>
        </el-col>
        <el-col :span="8" class="border-container">
          <div class="top-title">风量排行</div>
          <el-table
            :data="evaluation.top"
            style="width: 90%; margin: 10px">
            <el-table-column prop="rank" label="排名" width="100" align="center">
              <template slot-scope="scope">
                <div
                  class="rank"
                  v-if="scope.row.rank <= 3"
                  :style="{'background': rankColor[scope.row.rank - 1]}"
                >0{{ scope.row.rank }}</div>
                <div class="rank" v-else>{{ 10 > scope.row.rank ? '0' : '' }}{{ scope.row.rank }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="设备名称" width="150" align="center">
              <template slot-scope="scope">
                <a><router-link :to="`/device/detail?id=${scope.row.qrcode}`">{{ scope.row.name }}</router-link></a>
              </template>
            </el-table-column>
            <el-table-column prop="wind" label="风量" width="100" align="center">
              <template slot-scope="scope">
                {{ scope.row.wind.toFixed(2) }}
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>

import { getEvaluation } from '../../api/evaluation'
import LineChart from '../../components/LineChart/index'
import { mapGetters } from 'vuex'

export default {
  name: 'Evaluation',
  components: { LineChart },
  computed: {
    ...mapGetters([
      'appId'
    ])
  },
  data() {
    return {
      isOneDay: true,
      evaluationLoading: true,
      evaluation: {},
      rankColor: ['#24CE6E', '#FC8470', '#FFB922']
    }
  },
  mounted() {
    getEvaluation().then(response => {
      this.evaluation = response
      setTimeout(() => {
        this.evaluationLoading = false
      }, 1000)
    }).catch(() => {
      this.evaluationLoading = false
    })
  },
  methods: {
    changeDay(isOneDay) {
      this.isOneDay = isOneDay
    }
  }
}
</script>

<style lang="scss" scoped>
  $normal-color: #CFCFCF;
  .card-container {
    border-top: #24CE6E 1px solid;
    margin: 20px;
    height: 88vh;
    overflow: scroll
  }
  .border-container {
    border: 1px solid #D4D8D8;
  }
  .chart-container {
    width: 98%;
    padding: 30px 30px;
  }
  .top-title {
    height: 50px;
    text-align: center;
    background-color: #EFEFEF;
    padding-top: 15px;
  }
  .rank {
    width:29px;
    height:29px;
    padding: 3px;
    margin-left: 25px;
    background: $normal-color;
    border-radius:50%;
    color: white;
    font-family: Roboto-Regular;
  }
</style>
