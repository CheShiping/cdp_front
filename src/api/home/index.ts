import { request } from "@/utils/request"
import type { CategoryData } from "@/views/home/echarts/category.vue"

const getstatisticsData = async () => {
  const res = await request('/home/statistics')
  return res
}

const getcategoryData = async () => {
  const res = await request<CategoryData[]>('/home/categoryData')
  return res
}

export {getstatisticsData, getcategoryData}