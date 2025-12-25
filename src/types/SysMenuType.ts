// 菜单查询条件
export interface SysMenuQuery {
  keyword: string;
}

// 菜单实体类型
export interface SysMenuType {
  id: string; // 菜单ID
  parentId: string | null; // 父菜单ID
  type: '1' | '2'; // '1' 表示菜单，'2' 表示按钮
  path: string | null; // 路由路径
  name: string | null; // 路由名称
  redirect: string | null; // 重定向路径
  code: string; // 权限标识
  component: string | null; // 路由组件所在 src/views/ 下的相对路径
  meta: {
    title: string; // 菜单标题
    icon: string | null; // 菜单图标
    linkTo: string | null; // 外链地址
    cache: boolean; // 是否缓存
    hidden: boolean; // 是否在左侧菜单中显示，true 隐藏 / false 显示
    isBreadcrumb: boolean; // 是否在面包屑中显示
  };
  sort: number; // 排序
  remark: string | null; // 备注
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
  children: SysMenuType[]; // 子菜单
  routeName: string; // 新增字段
  hidden: boolean, // 是否在左侧菜单中显示，true 隐藏 / false 显示
  cache: boolean   // 是否缓存
}