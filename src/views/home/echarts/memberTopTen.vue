<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import * as echarts from 'echarts'
import ECharts from '@/components/Echarts.vue'
import { getMemberTopTenData } from '@/api/home'
import { useThemeStore } from '@/stores/theme'

// 定义数据类型
export interface MemberConsumeData {
  name: string
  consumeMoney: number
}

// 模拟API返回的数据
const memberData = ref<MemberConsumeData[]>([])
const getMemberTopTen = async () => {
  try {
    const { data } = await getMemberTopTenData()
    if (data && Array.isArray(data)) {
      memberData.value = data
    } else {
      console.error('API 返回的数据格式不正确:', data)
    }
  } catch (error) {
    console.error('获取会员消费Top10数据时出错:', error)
  }
}

onMounted(() => getMemberTopTen())

// 获取CSS变量值
const getCssVariable = (variableName: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName)
}

const themeStore = useThemeStore();

const getTitleColors = () => {
  return themeStore.isDarkTheme 
    ? { 
        titleColor: '#fff',
        subtitleColor: '#ccc'
      } 
    : { 
        titleColor: '#000',
        subtitleColor: '#666'
      };
};

// 计算属性用于生成图表配置选项
const chartOption = computed(() => {

  // 获取当前主题下的标题颜色
  const { titleColor, subtitleColor } = getTitleColors();

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: '{b}: {c} 元'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '2%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: memberData.value.map(item => item.name),
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        // 移除rotate，增加间距
        interval: 0,
        rotate: 0,
        textStyle: {
          color: titleColor
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 元',
        textStyle: {
          color: titleColor
        }
      },

    },
    series: [{
      type: 'bar',
      barWidth: '60%',
      data: memberData.value.map(item => item.consumeMoney),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ])
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' }
          ])
        }
      }
    }]
  }
})
</script>

<template>
  <a-card :bordered="false" style="height: 500px;">
    <ECharts
      :option="chartOption"
      title="会员消费Top10"
      subtitle="单位：元"
      width="100%"
      height="450px"
    />
  </a-card>
</template>