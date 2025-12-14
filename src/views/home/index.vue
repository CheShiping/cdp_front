<template>
  <div>
    <h1>首页</h1>
    <p>{{ JSON.stringify(employee) }}</p>
  </div>
</template>

<script setup lang="ts">
import { getEmployeeInfo } from '@/api/test';
import { onMounted, ref } from 'vue';

const employee = ref()
const getEmployee = async () => {
  const res = await getEmployeeInfo()
  employee.value = res.data
}

onMounted(() =>   getEmployee())
</script>

<style scoped>
</style>