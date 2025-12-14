<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  FullscreenOutlined,
  DownOutlined,
  SettingOutlined,
  MenuOutlined,
  ShoppingOutlined,
  LinkOutlined,
  ExclamationCircleOutlined,
  LogoutOutlined,
  AntDesignOutlined,
  CheckOutlined,
  CloseOutlined,
  BellOutlined,
  BulbOutlined
} from '@ant-design/icons-vue';

const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);
const isDarkTheme = ref<boolean>(false);

const state = ref({
  checked3: false,
});


</script>

<template>
  <a-layout class="main-layout">
    <!-- 侧边栏 -->
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
          <a-menu-item key="3">
            <menu-outlined />
            <span>菜单管理</span>
          </a-menu-item>
          <a-menu-item key="4">
            <user-outlined />
            <span>角色管理</span>
          </a-menu-item>
          <a-menu-item key="5">
            <user-outlined />
            <span>用户管理</span>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="6">
          <shopping-outlined />
          <span>商品管理</span>
        </a-menu-item>
        <a-menu-item key="7">
          <link-outlined />
          <span>成职院官网</span>
        </a-menu-item>
        <a-menu-item key="8">
          <exclamation-circle-outlined />
          <span>401页面</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <!-- 主内容区 -->
    <a-layout class="layout-content">
      <!-- 顶部导航栏 -->
      <a-layout-header class="header">
        <div class="header-content">
          <!-- 左侧操作 -->
          <div class="header-left">
            
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

      <!-- 内容区域 -->
      <a-layout-content class="content">
        <div class="content-wrapper">
          Content
        </div>
      </a-layout-content>

      <!-- 底部 -->
      <a-layout-footer class="footer">
        <div class="footer-content">
          <div class="footer-left">
            管理系统 ©2024
          </div>
          <div class="footer-right">
            <span>版本: 1.0.0</span>
          </div>
        </div>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="scss">
.main-layout {
  min-height: 100vh;

  .sider {
    box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
    z-index: 10;
    
    .logo-container {
      height: 64px;
      display: flex;
      align-items: center;
      padding: 0 24px;
      border-bottom: 1px solid var(--mxg-border-color-light);
      
      .logo {
        display: flex;
        align-items: center;
        
        &.collapsed {
          justify-content: center;
        }
        
        .logo-icon {
          font-size: 24px;
          color: var(--mxg-color-primary);
        }
        
        .logo-icon-collapsed {
          font-size: 24px;
          color: var(--mxg-color-primary);
        }
        
        .logo-text {
          margin-left: 12px;
          font-size: 18px;
          font-weight: 600;
          color: var(--mxg-color-text1);
        }
      }
    }
  }

  .layout-content {
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
              color: var(--mxg-color-primary);
            }
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
            padding: 0 10px;
            height: 50px;
            
            &:hover {
              background: var(--mxg-color-user-hover);
            }
            
            .user-name {
              margin-left: 8px;
              font-weight: 500;
              color: var(--mxg-color-text2);
            }
          }
        }
      }
    }

    .content {
      background-color: var(--mxg-color-bg);
      padding: 16px;
      height: calc(100vh - 64px - 69px); // header高度 + footer高度
      overflow: auto;
      
      .content-wrapper {
        background: var(--mxg-color-white);
        padding: 16px;
        min-height: 100%;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: var(--mxg-color-tip);
      }
    }

    .footer {
      padding: 0;
      background: var(--mxg-color-white);
      border-top: 1px solid var(--mxg-border-color-light);
      
      .footer-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 24px;
        color: var(--mxg-color-text3);
        font-size: 14px;
      }
    }
  }
}
</style>