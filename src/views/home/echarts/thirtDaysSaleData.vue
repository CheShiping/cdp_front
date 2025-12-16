<script setup lang="ts">
import { getLast30DaysSaleData } from '@/api/home';
import { onMounted, ref, computed } from 'vue';
import ECharts from '@/components/Echarts.vue';

export interface Last30DaysSaleData {
  last30Days: string[]
  orderNumList: number[]
  saleMoneyList: number[]
  returnMoneyList: number[]
  rechargeMoneyList: number[]
}

// 定义数据类型
interface ChartSeries {
  typeName: string
  list: number[]
}

interface ChartData {
  loading: boolean
  xAxisData: string[]
  seriesData: ChartSeries[]
}

// 使用更清晰的数据结构
const chartData = ref<ChartData>({
  loading: false,
  xAxisData: [],
  seriesData: []
})

// 计算属性用于获取各个数据系列
const orderNumSeries = computed(() => 
  chartData.value.seriesData.find(series => series.typeName === '订单数')?.list || []
)

const saleMoneySeries = computed(() => 
  chartData.value.seriesData.find(series => series.typeName === '销售额')?.list || []
)

const returnMoneySeries = computed(() => 
  chartData.value.seriesData.find(series => series.typeName === '退款额')?.list || []
)

const rechargeMoneySeries = computed(() => 
  chartData.value.seriesData.find(series => series.typeName === '充值额')?.list || []
)

// 添加计算属性用于生成图表配置选项
const chartOption = computed(() => {
  return {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top: '4%',
      right: '10%',
      data: ['订单数', '销售额', '退款额', '充值额']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: chartData.value.xAxisData
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '订单数',
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        data: orderNumSeries.value,
      },
      {
        name: '销售额',
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        data: saleMoneySeries.value
      },
      {
        name: '退款额',
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        data: returnMoneySeries.value
      },
      {
        name: '充值额',
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        data: rechargeMoneySeries.value
      }
    ]
  };
});

const loadLast30DaysSaleData = async () => {
  chartData.value.loading = true
  try {
    const { data } = await getLast30DaysSaleData()
    
    // 更新图表数据
    chartData.value.xAxisData = data.last30Days
    chartData.value.seriesData = [
      { typeName: '订单数', list: data.orderNumList },
      { typeName: '销售额', list: data.saleMoneyList },
      { typeName: '退款额', list: data.returnMoneyList },
      { typeName: '充值额', list: data.rechargeMoneyList }
    ]
    console.log("chartData: ", chartData)
  } catch (error) {
    console.error('加载30天销售数据失败:', error)
  } finally {
    chartData.value.loading = false
  }
}

onMounted(() => {
  loadLast30DaysSaleData()
})
</script>

<template>
  <a-card :bordered="false" style="height: 500px;">
    <!-- 图表容器 -->
    <ECharts
      :option="chartOption"
      title="近30天销售趋势"
      width="100%"
      height="500px"
    /> 
  </a-card>
</template>

<style lang="scss" scoped>
  .chart-container {
    margin-top: 16px;
  }
</style>
