<script setup lang="ts">
import { getstatisticsData } from '@/api/home';
import { onMounted, ref } from 'vue';
import { Card, Statistic, Space, Row, Col, Skeleton } from 'ant-design-vue';

const state = ref({
  loading: false,
  statisticData: {
    totalOrderNum: 0,
    totalSaleMoney: 0,
    totalReturnedMoney: 0,
    totalIncomeMoney: 0
  }
} as any)

const loadStatisticsData = async () => {
  try {
    state.value.loading = true;
    const { data } = await getstatisticsData()
    console.log('首页统计数据：', data);
    state.value.statisticData = data
  } catch (error) {
  } finally {
    state.value.loading = false
  }
}

onMounted(() => loadStatisticsData())
</script>

<template>
  <div class="statistics-container">
    <a-row :gutter="[16, 16]" type="flex">
      <a-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <a-card hoverable class="statistic-card card-1">
          <a-skeleton v-if="state.loading" active :paragraph="{ rows: 2 }" />
          <div v-else>
            <a-statistic
              title="总订单数"
              :value="state.statisticData.totalOrderNum"
              :precision="0"
            >
              <template #prefix>
                <span class="statistic-icon">📦</span>
              </template>
              <template #suffix>
                <span class="statistic-suffix">笔</span>
              </template>
            </a-statistic>
          </div>
        </a-card>
      </a-col>
      
      <a-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <a-card hoverable class="statistic-card card-2">
          <a-skeleton v-if="state.loading" active :paragraph="{ rows: 2 }" />
          <div v-else>
            <a-statistic
              title="总销售额"
              :value="state.statisticData.totalSaleMoney"
              :precision="2"
            >
              <template #prefix>
                <span class="statistic-icon">💰</span>
              </template>
              <template #suffix>
                <span class="statistic-suffix">元</span>
              </template>
            </a-statistic>
          </div>
        </a-card>
      </a-col>
      
      <a-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <a-card hoverable class="statistic-card card-3">
          <a-skeleton v-if="state.loading" active :paragraph="{ rows: 2 }" />
          <div v-else>
            <a-statistic
              title="总退款额"
              :value="state.statisticData.totalReturnedMoney"
              :precision="1"
            >
              <template #prefix>
                <span class="statistic-icon">💸</span>
              </template>
              <template #suffix>
                <span class="statistic-suffix">元</span>
              </template>
            </a-statistic>
          </div>
        </a-card>
      </a-col>
      
      <a-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <a-card hoverable class="statistic-card card-4">
          <a-skeleton v-if="state.loading" active :paragraph="{ rows: 2 }" />
          <div v-else>
            <a-statistic
              title="总收入"
              :value="state.statisticData.totalIncomeMoney"
              :precision="1"
            >
              <template #prefix>
                <span class="statistic-icon">📈</span>
              </template>
              <template #suffix>
                <span class="statistic-suffix">元</span>
              </template>
            </a-statistic>
          </div>
        </a-card>
      </a-col>
    </a-row>

  </div>
</template>

<style lang="scss" scoped>
.statistics-container {
  margin-bottom: 24px;
}

.statistic-card {
  height: 120px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  ::v-deep(.ant-card-body) {
    width: 100%;
  }
  
  ::v-deep(.ant-statistic) {
    width: 100%;
  }
  
  ::v-deep(.ant-statistic-title) {
    font-size: 16px;
    margin-bottom: 12px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
  }
  
  ::v-deep(.ant-statistic-content) {
    font-size: 28px;
    line-height: 1.2;
    color: white;
    
    .ant-statistic-content-value {
      color: white;
      font-weight: 600;
    }
  }
}

.statistic-icon {
  font-size: 24px;
  margin-right: 8px;
  vertical-align: middle;
}

.card-1 {
  background: linear-gradient(135deg, var(--mxg-color-green) 0%, var(--mxg-color-green-light) 100%);
}

.card-2 {
  background: linear-gradient(135deg, var(--mxg-color-blue) 0%, var(--mxg-color-blue-light) 100%);
}

.card-3 {
  background: linear-gradient(135deg, var(--mxg-color-red) 0%, var(--mxg-color-red-light) 100%);
}

.card-4 {
  background: linear-gradient(135deg, var(--mxg-color-purple) 0%, var(--mxg-color-purple-light) 100%);
}

.statistic-suffix {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin-left: 4px;
  font-weight: 500;
}
</style>