<template>
  <el-card shadow="hover" style="border-top: #24CE6E 1px solid; margin: 10px;height: 90vh;">
    <div slot="header" class="clearfix el-row--flex">
      <div class="green-point"></div>
      <span>管理AppID</span>
    </div>
    <div v-if="appId === ''" style="margin-left: 20px">
      <p>您当前尚未绑定AppID, <el-button type="text"><router-link to="/appId/bind">去绑定</router-link></el-button></p>
    </div>
    <div v-else style="margin-left: 20px">
      <p>您当前绑定的AppID为：<strong>{{appId}}</strong></p>
      <span>若需要解除绑定，请点击<el-button type="danger" @click="unbind" style="margin: 10px">解除绑定</el-button></span>
    </div>
  </el-card>
</template>

<script>
import store from '../../store'

export default {
  name: 'ManageAppID',
  data() {
    return {
      appId: ''
    }
  },
  mounted() {
    this.appId = store.getters.appId
  },
  methods: {
    unbind() {
      this.$confirm(`确认解除与 ${this.appId} 的绑定?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        this.$store.dispatch('user/unbindAppId', this.appId).then(response => {
          this.$message({
            type: 'success',
            message: '解绑成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消解绑'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
