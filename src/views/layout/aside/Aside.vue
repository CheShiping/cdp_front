<script setup lang="ts">
import {
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  ShoppingOutlined,
  LinkOutlined,
  ExclamationCircleOutlined,
  AntDesignOutlined,
} from '@ant-design/icons-vue';
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const selectedKeys = ref<string[]>([route.path]);

// 监听路由变化，更新选中的菜单项
watch(route, (newRoute) => {
  selectedKeys.value = [newRoute.path];
}, { immediate: true });
const openKeys = ref<string[]>([]);

const collapsed = defineModel<boolean>('collapsed', { required: true });

// 获取所有需要显示的路由
const showRouters = computed(() => {
  const layoutRoute = router.options.routes.find(r => r.name === 'Layout');
  return layoutRoute?.children?.filter(item => !item.meta?.hidden) || [];
});

// 展开菜单事件
const onOpenChange = (keys: string[]) => {
  openKeys.value = keys;
};

const handleMenuItemClick = (item: any) => {
  // 如果有外链，则打开新窗口
  if (item.meta?.linkTo) {
    window.open(item.meta.linkTo, '_blank');
    return;
  }
  
  // 否则进行路由跳转
  if (item.path) {
    router.push(item.path);
  }
};
</script>

<template>
  <a-layout-sider 
    v-model:collapsed="collapsed" 
    collapsible  
    theme="light"
    :width="256"
    :collapsedWidth="80"
    class="sider"
  >
    <div class="logo-container">
      <div class="logo" :class="{ collapsed: collapsed }">
        <ant-design-outlined v-if="!collapsed" class="logo-icon" />
        <ant-design-outlined v-else class="logo-icon-collapsed" />
        <span v-if="!collapsed" class="logo-text">成职院后台系统</span>
      </div>
    </div>
    
    <a-menu 
      v-model:selectedKeys="selectedKeys" 
      v-model:openKeys="openKeys"
      mode="inline"
      @openChange="onOpenChange"
    >
      <template v-for="item in showRouters" :key="item.path">
        <!-- 有子菜单的情况 -->
        <a-sub-menu v-if="item.children && item.children.length > 0" :key="item.path">
          <template #title>
            <component v-if="item.meta?.icon" :is="item.meta.icon" />
            <span>{{ item.meta?.title }}</span>
          </template>
          <!-- 递归渲染子菜单 -->
          <template v-for="child in item.children" :key="child.path">
            <a-menu-item v-if="!child.meta?.hidden" :key="child.path" @click="handleMenuItemClick(child)">
              <component v-if="child.meta?.icon" :is="child.meta.icon" />
              <span>{{ child.meta?.title }}</span>
            </a-menu-item>
          </template>
        </a-sub-menu>
        <!-- 没有子菜单的情况 -->
        <a-menu-item v-else :key="'menu-item-' + item.path" @click="handleMenuItemClick(item)">
          <component v-if="item.meta?.icon" :is="item.meta.icon" />
          <span>{{ item.meta?.title }}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<style scoped lang="scss">
.sider {
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  z-index: 10;
  
  .logo-container {
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    
    .logo {
      display: flex;
      align-items: center;
      
      &.collapsed {
        justify-content: center;
      }
      
      .logo-icon {
        font-size: 24px;
        color: #1890ff;
      }
      
      .logo-icon-collapsed {
        font-size: 24px;
        color: #1890ff;
      }
      
      .logo-text {
        margin-left: 12px;
        font-size: 18px;
        font-weight: 600;
        color: var(--mxg-color-black);
      }
    }
  }
}
</style>