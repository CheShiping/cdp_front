import { request } from "@/utils/request"

const getEmployeeInfo = async () => {
  const res = await request('/390721942')
  console.log("员工：", res.data);
  return res
}

export {getEmployeeInfo}