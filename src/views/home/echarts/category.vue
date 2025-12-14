<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import ECharts from '@/components/Echarts.vue';
import { getcategoryData } from '@/api/home';

export interface CategoryData {
  name: string;
  value: number;
}

const state = ref({
  category: {
    loading: false,
    data: [] as CategoryData[]
  }
})

const loadCategoryData = async () => {
  try {
    state.value.category.loading = true
    const {data} = await getcategoryData()
    state.value.category.data = data
    console.log('category:', data)
  } catch{
  } finally {
    state.value.category.loading = false
  }
}

onMounted(() => loadCategoryData())

// 使用计算属性确保数据变化时图表能更新
const chartOption = computed(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '单位：元',
      type: 'pie',
      radius: '60%',
      data: state.value.category.data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}));
</script>

<template>
          <a-card :bordered="false" style="height: 500px;">
                <ECharts 
      :option="chartOption" 
      title="分类销售统计" 
      subtitle="每种商品分类的近30天销售数据" 
      width="100%" 
      height="480px" 
    />
          </a-card>

</template>

<style lang="scss" scoped>
</style>