<template>
  <div class="fail-chart-container">
    <img src="@/assets/fail-chart.png" alt="fail-chart"/>
    <p class="prompt">暂无{{ name }}数据</p>
  </div>
</template>

<script>
export default {
  name: 'NoDataChart',
  props: {
    name: {
      type: String,
      default: '图表'
    }
  }
}
</script>

<style scoped>
  .fail-chart-container {
    text-align: center;
    width: 100%;
    margin-top: 120px;
  }
</style>
