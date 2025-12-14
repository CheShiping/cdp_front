<template>
  <div ref="chartRef" :style="{width: props.width, height: props.height}"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import * as echarts from 'echarts';
import { useThemeStore } from '@/stores/theme';

const chartRef = ref(null);
const chart = ref(null);
const themeStore = useThemeStore();
const props = defineProps({
  option: { type: Object, required: true },
  title: { type: String, default: '' },
  subtitle: { type: String, default: ''},
  width: { type: String, default: '100%' },
  height: { type: String, default: '400px' }
});

let resizeHandler = null;

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

const initChart = () => {
  if (chart.value) {
    chart.value.dispose();
  }
  
  nextTick(() => {
    if (chartRef.value) {
      // 创建图表实例
      chart.value = echarts.init(chartRef.value);
      
      // 获取当前主题下的标题颜色
      const { titleColor, subtitleColor } = getTitleColors();
      
      // 设置图表配置，包括标题
      const chartOption = {
        ...props.option,
        title: {
          text: props.title,
          subtext: props.subtitle,
          x: 'left',
          textStyle: {
            color: titleColor, // 根据主题设置主标题颜色
            fontWeight: 'bold'
          },
          subtextStyle: {
            color: subtitleColor, // 根据主题设置副标题颜色
            fontSize: 14
          }
        }
      };
      
      chart.value.setOption(chartOption);
      
      resizeHandler = () => {
        chart.value && chart.value.resize();
      };
      
      window.addEventListener('resize', resizeHandler);
    }
  });
};

onMounted(() => {
  initChart();
});

watch(
  () => [props.option, themeStore.isDarkTheme],
  ([newVal, newTheme]) => {
    if (chart.value) {
      // 获取当前主题下的标题颜色
      const { titleColor, subtitleColor } = getTitleColors();
      
      // 当option或主题变化时，更新图表配置
      const chartOption = {
        ...newVal,
        title: {
          text: props.title,
          subtext: props.subtitle,
          x: 'left',
          textStyle: {
            color: titleColor, // 根据主题设置主标题颜色
            fontWeight: 'bold'
          },
          subtextStyle: {
            color: subtitleColor, // 根据主题设置副标题颜色
            fontSize: 14
          }
        }
      };
      chart.value.setOption(chartOption, true);
    }
  },
  { deep: true }
);

// 监听窗口可见性变化，在页面切换回来时重绘图表
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && chart.value) {
    setTimeout(() => {
      chart.value && chart.value.resize();
    }, 100);
  }
});

onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
    resizeHandler = null;
  }
  if (chart.value) {
    chart.value.dispose();
    chart.value = null;
  }
});
</script>