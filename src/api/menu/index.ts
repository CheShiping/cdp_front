import { request } from "@/utils/request";
import type { SysMenuQuery, SysMenuType } from "@/types/SysMenuType";

const postMenuTreeInfo = async (data: SysMenuQuery) => {
  return await request<SysMenuType[]>("/system/menu/search", "post", data)
}

const deleteMenuById = async (id: string) => {
  return await request("/system/menu", "delete", { id })
}

const getMenuSelect = async () => {
  return await request("/system/menu/select")
}

export { postMenuTreeInfo, deleteMenuById, getMenuSelect }