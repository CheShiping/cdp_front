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
import { ref } from 'vue';

const selectedKeys = ref<string[]>((['1'] as string[]));
const collapsed = defineModel<boolean>('collapsed', { required: true });
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
        <span v-if="!collapsed" class="logo-text">管理系统</span>
      </div>
    </div>
    
    <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
      <a-menu-item key="1">
        <user-outlined />
        <span>首页</span>
      </a-menu-item>
      <a-sub-menu key="2">
        <template #title>
          <setting-outlined />
          <span>系统管理</span>
        </template>
        <a-menu-item key="2-1">菜单管理</a-menu-item>
        <a-menu-item key="2-2">角色管理</a-menu-item>
        <a-menu-item key="2-3">用户管理</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="3">
        <template #title>
          <shopping-outlined />
          <span>商品管理</span>
        </template>
        <a-menu-item key="3-1">商品列表</a-menu-item>
        <a-menu-item key="3-2">商品分类</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="4">
        <link-outlined />
        <span>成职院官网</span>
      </a-menu-item>
      <a-menu-item key="5">
        <exclamation-circle-outlined />
        <span>401页面</span>
      </a-menu-item>
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