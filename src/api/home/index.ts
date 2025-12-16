import { request } from "@/utils/request"
import type { Last30DaysSaleData } from "@/views/home/echarts/thirtDaysSaleData.vue"
import type { CategoryData } from "@/views/home/echarts/category.vue"
import type { MemberConsumeData } from "@/views/home/echarts/memberTopTen.vue"

const getstatisticsData = async () => {
  return await request('/home/statistics')
}

const getcategoryData = async () => {
  return await request<CategoryData[]>('/home/categoryData')
}

// 根据实际返回的数据结构，这里应该是Last30DaysSaleData而不是Last30DaysSaleData[]
const getLast30DaysSaleData = async () => {
    return await request<Last30DaysSaleData>('/home/30days/saleData')
}

const getMemberTopTenData = async () => {
  return await request<MemberConsumeData[]>('/home/member/top10')
}

export { getstatisticsData, getcategoryData, getLast30DaysSaleData, getMemberTopTenData }