<script setup lang="ts">
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  FullscreenOutlined,
  DownOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/stores/theme';

const collapsed = defineModel<boolean>('collapsed', { required: true });

const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

// 修复主题切换功能
const handleThemeChange = (checked: boolean) => {
  themeStore.setTheme(checked ? 'dark' : 'light');
};

defineExpose({
  handleThemeChange
});
</script>

<template>
  <a-layout-header class="header">
    <div class="header-content">
      <!-- 左侧操作 -->
      <div class="header-left">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined 
          v-else 
          class="trigger" 
          @click="() => (collapsed = !collapsed)" 
        />
        
        <!-- 面包屑导航 -->
        <a-breadcrumb separator="/">
          <a-breadcrumb-item>
            <home-outlined />
          </a-breadcrumb-item>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
        </a-breadcrumb>
      </div>

      <!-- 右侧工具栏 -->
      <div class="header-right">

        <!-- 全屏按钮 -->
        <a-tooltip title="全屏">
          <a-button type="text" size="small">
            <fullscreen-outlined />
          </a-button>
        </a-tooltip>

        <!-- Switch to toggle between light and dark themes -->
        <a-switch 
          :checked="isDarkTheme" 
          checked-children="Dark" 
          un-checked-children="Light" 
          @change="handleThemeChange"
        />

        <!-- 用户信息下拉 -->
        <a-dropdown>
          <div class="user-info">
            <a-avatar :size="32">
              <template #icon>
                <user-outlined />
              </template>
            </a-avatar>
            <span class="user-name">管理员</span>
            <down-outlined style="margin-left: 4px;" />
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item key="profile">
                <user-outlined />
                个人资料
              </a-menu-item>
              <a-menu-item key="settings">
                <setting-outlined />
                账户设置
              </a-menu-item>
              <a-menu-item key="logout">
                <logout-outlined />
                退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<style scoped lang="scss">
.header {
  padding: 0;
  background: var(--mxg-bg-headerBarColor);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  height: 64px;
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    height: 100%;
    
    .header-left {
      display: flex;
      align-items: center;
      
      .trigger {
        font-size: 18px;
        line-height: 64px;
        cursor: pointer;
        transition: color 0.3s;
        
        &:hover {
          color: var(--mxg-color-primary)
        }
      }
      
      :deep(.ant-breadcrumb) {
        margin-left: 16px;
      }
    }
    
    .header-right {
      display: flex;
      align-items: center;
      
      .user-info {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-left: 16px;
        
        .user-name {
          margin-left: 8px;
          font-weight: 500;
        }
      }
    }
  }
}
</style>