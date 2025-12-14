import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Layout from '../views/layout/index.vue'

// 扩展 RouteMeta 接口，因为 Vue-Router 的配置路由对象的 meta 属性有限，所以需要扩展
declare module 'vue-router' {
  interface RouteMeta {
    title?: string; // 菜单标题
    icon?: string;  // 图标
    linkTo?: string; // 外链地址
    cache?: boolean; //是否缓存：true缓存，false不缓存，会将 name 值用于 <keep-alive>的 includes 上
    hidden?: boolean; // 是否在菜单中显示：true显示，false隐藏
    isBreadcrumb?: boolean; // 是否显示到面包屑，默认或true会显示，false不显示。
  }
}

/**
 * 动态路由：后端请求路由配置数据后，赋值给下面路由数组的顶级对象的children属性（即 布局 Layout 对象的children属性）
 * @returns 动态路由配置数组
 */
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeOutlined',
          cache: false,
          hidden: false,
        }
      },
      {
        path: '/system',
        name: 'System',
        redirect: '/system/menu',
        meta: {
          title: '系统管理',
          icon: 'SettingOutlined',
        },
        children: [
          {
            path: '/system/menu',
            name: 'SystemMenu',
            component: () => import('../views/system/menu/index.vue'),
            meta: {
              title: '菜单管理',
              icon: 'MenuOutlined',
              cache: true,
              hidden: false
            }
          },
          {
            path: '/system/role',
            name: 'SystemRole',
            component: () => import('../views/system/role/index.vue'),
            meta: {
              title: '角色管理',
              icon: 'TeamOutlined',
              cache: true,
              hidden: false
            }
          },
          {
            path: '/system/user',
            name: 'SystemUser',
            component: () => import('../views/system/user/index.vue'),
            meta: {
              title: '用户管理',
              icon: 'UserOutlined',
              cache: true,
              hidden: false
            }
          }
        ]
      },
      {
        path: "/goods",
        name: "Goods",
        redirect: "/goods/list",
        meta: {
          title: "商品管理",
          icon: 'ShoppingOutlined',
          cache: true,
          hidden: false
        },
        children: [
          {
            path: "/goods/list",
            name: "GoodsList",
            component: () => import('../views/goods/list/index.vue'),
            meta: {
              title: "商品列表",
              icon: 'UnorderedListOutlined',
              cache: true,
              hidden: false
            }
          },
          {
            path: "/goods/category",
            name: "GoodsCategory",
            component: () => import('../views/goods/category/index.vue'),
            meta: {
              title: "商品分类",
              icon: 'ApartmentOutlined',
              cache: true,
              hidden: false
            }
          }
        ]
      },
      {
        path: '/cdp',
        name: 'cdp',
        component: () => import('../views/link/index.vue'),
        meta: {
          title: '成职院官网',
          icon: 'LinkOutlined',
          cache: false,
          hidden: false,
          linkTo: 'https://www.cdp.edu.cn'  //外链跳转地址
        }
      },
      {
        path: '/401',
        name: 'NoPermission',
        component: () => import('../views/error/401.vue'),
        meta: {
          title: '401页面',
          icon: 'LockOutlined',
          hidden: false
        }
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/error/404.vue'),
        meta: {
          title: '未找到此页面',
          cache: true,
          hidden: true,
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: dynamicRoutes,
})

export default router