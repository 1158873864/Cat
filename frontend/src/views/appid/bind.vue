<template>
  <div class="login-container">
    <img src="@/assets/login.png" class="background-pic" alt="login-pic">

    <div class="title-container">
      <h3 class="title">绑定AppID</h3>
    </div>

    <el-form ref="appIdForm" :model="form" class="login-form" label-position="left">
      <el-alert
        type="warning"
        show-icon
        :closable="false"
        title="在登录Mooctest-AIoT前，您需要绑定一个AppID，关联您所管理的设备。"
        style="margin-bottom: 30px"
      />
      <el-form-item prop="appId">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="form.appId"
          placeholder="请输入正确的AppID"
          name="username"
          type="text"
          tabindex="1"
        />
      </el-form-item>
      <el-button type="success" class="login-btn" @click="handleBind()">确认绑定</el-button>
    </el-form>

    <div class="footer-text">南京慕测信息科技有限公司</div>
  </div>
</template>

<script>

export default {
  name: 'Bind',
  data() {
    return {
      form: {
        appId: ''
      }
    }
  },
  methods: {
    handleBind() {
      this.$store.dispatch('user/bindAppId', this.form.appId).then(() => {
        this.$message({
          type: 'success',
          message: '绑定成功!'
        })
        this.$router.push({ path: '/' })
      })
    }
  }
}
</script>

<style scoped>

</style>
