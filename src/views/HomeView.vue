<script setup lang="ts">
import { getEmployeeInfo } from '@/api/test';
import { onMounted, ref } from 'vue';

const employee = ref()

const getEmployee = async () => {
  const res = await getEmployeeInfo()
  employee.value = res.data
}

onMounted(() => getEmployee())
</script>

<template>
  <div>员工：{{ employee }}</div>
</template>

<style scoped>

</style>