import { request } from "@/utils/request";
import type { SysMenuQuery } from "@/types/SysMenuType";

const postMenuTreeInfo = async (data: SysMenuQuery) => {
  return await request("/system/menu/search", "post", data)
}

export { postMenuTreeInfo }