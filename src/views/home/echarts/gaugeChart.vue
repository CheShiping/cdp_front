<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ECharts from '@/components/Echarts.vue';

const temperatureValue = ref(20);

// 生成随机温度值的函数
const generateRandomTemperature = () => {
  return +(Math.random() * 60).toFixed(2);
};

// 图表配置选项
const chartOption = ref({
  series: [
    {
      type: 'gauge',
      center: ['50%', '60%'],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 60,
      splitNumber: 12,
      itemStyle: {
        color: '#FFAB91'
      },
      progress: {
        show: true,
        width: 30
      },
      pointer: {
        show: false
      },
      axisLine: {
        lineStyle: {
          width: 30
        }
      },
      axisTick: {
        distance: -45,
        splitNumber: 5,
        lineStyle: {
          width: 2,
          color: '#999'
        }
      },
      splitLine: {
        distance: -52,
        length: 14,
        lineStyle: {
          width: 3,
          color: '#999'
        }
      },
      axisLabel: {
        distance: -20,
        color: '#999',
        fontSize: 20
      },
      anchor: {
        show: false
      },
      title: {
        show: false
      },
      detail: {
        valueAnimation: true,
        width: '60%',
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, '-15%'],
        fontSize: 40,
        fontWeight: 'bolder',
        formatter: '{value} °C',
        color: 'inherit'
      },
      data: [
        {
          value: temperatureValue.value
        }
      ]
    },
    {
      type: 'gauge',
      center: ['50%', '60%'],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 60,
      itemStyle: {
        color: '#FD7347'
      },
      progress: {
        show: true,
        width: 8
      },
      pointer: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      detail: {
        show: false
      },
      data: [
        {
          value: temperatureValue.value
        }
      ]
    }
  ]
});

let intervalId: number | null = null;

// 更新图表数据
const updateChartData = () => {
  temperatureValue.value = generateRandomTemperature();
  
  // 更新图表选项中的数据
  chartOption.value.series[0]?.data[0] && (chartOption.value.series[0].data[0].value = temperatureValue.value);
  chartOption.value.series[1]?.data[0] && (chartOption.value.series[1].data[0].value = temperatureValue.value);
};

onMounted(() => {
  // 每2秒更新一次数据
  intervalId = window.setInterval(updateChartData, 2000);
});

onBeforeUnmount(() => {
  // 清除定时器
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <a-card :bordered="false" style="height: 500px;">
    <ECharts
      :option="chartOption"
      title="温度仪表盘"
      width="100%"
      height="500px"
    />
  </a-card>
</template>

<style lang="scss" scoped>
</style>