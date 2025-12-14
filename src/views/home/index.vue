<template>
  <div>
    <!-- 营业统计 -->
    <StatisticBlock />
        
    <!-- 这里可以放置你的ECharts图表 -->
    <div class="echarts-container">
      <!-- ECharts图表将放在这里 -->
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <Category />
        </a-col>
        <a-col :span="12">
          <a-card title="图表2" :bordered="false" style="height: 500px;">
            <div class="chart-placeholder">图表2占位符</div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card title="图表3" :bordered="false" style="height: 500px;">
            <div class="chart-placeholder">图表3占位符</div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card title="图表4" :bordered="false" style="height: 500px;">
            <div class="chart-placeholder">图表4占位符</div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatisticBlock from './components/statisticBlock.vue';
import Category from './echarts/category.vue';

</script>

<style lang="scss" scoped>
.chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
  font-size: 16px;
}
</style>