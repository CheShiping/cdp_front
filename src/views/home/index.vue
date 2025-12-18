<template>
  <div>
    <!-- 营业统计 -->
    <StatisticBlock />
        
    <!-- 这里可以放置你的ECharts图表 -->
    <div class="echarts-container">
      <!-- ECharts图表将放在这里 -->
      <a-row :gutter="[16, 16]">
        <a-col :span="9">
          <Category />
        </a-col>
        <a-col :span="15">
          <ThirtDaysSaleData />
        </a-col>
        <a-col :span="15">
          <MemberTopTen />
        </a-col>
        <a-col :span="9">
          <GaugeChart />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatisticBlock from './components/statisticBlock.vue';
import Category from './echarts/category.vue';
import GaugeChart from './echarts/gaugeChart.vue';
import MemberTopTen from './echarts/memberTopTen.vue';
import ThirtDaysSaleData from './echarts/thirtDaysSaleData.vue';

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