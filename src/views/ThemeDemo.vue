<template>
  <div class="theme-demo">
    <a-row :gutter="[16, 16]">
      <a-col :span="24">
        <h1>主题演示</h1>
        <p>本页面展示了 Ant Design Vue 的主题定制功能</p>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]">
      <a-col :span="24">
        <a-card title="主题切换">
          <a-space>
            <a-button @click="switchTheme('default')">默认主题</a-button>
            <a-button @click="switchTheme('dark')">暗黑主题</a-button>
            <a-button @click="switchTheme('compact')">紧凑主题</a-button>
          </a-space>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-card title="基础组件">
          <a-space direction="vertical" :style="{ width: '100%' }">
            <a-button type="primary">Primary Button</a-button>
            <a-button>Default Button</a-button>
            <a-button type="dashed">Dashed Button</a-button>
            <a-button type="link">Link Button</a-button>
            <a-button type="text">Text Button</a-button>
            
            <a-divider orientation="left">不同状态按钮</a-divider>
            <a-button type="primary" ghost>幽灵按钮</a-button>
            <a-button type="primary" danger>危险按钮</a-button>
            <a-button type="primary" disabled>禁用按钮</a-button>
            <a-button type="dashed" danger>危险虚线按钮</a-button>
            
            <a-divider orientation="left">模拟 Element UI 风格按钮</a-divider>
            <a-space>
              <a-button type="primary">Primary</a-button>
              <a-button class="success-btn">Success</a-button>
              <a-button class="info-btn">Info</a-button>
              <a-button class="warning-btn">Warning</a-button>
              <a-button danger>Danger</a-button>
            </a-space>
            
            <a-divider orientation="left">不同尺寸按钮</a-divider>
            <a-button type="primary" size="large">大号按钮</a-button>
            <a-button type="primary">默认按钮</a-button>
            <a-button type="primary" size="small">小号按钮</a-button>
          </a-space>
        </a-card>
      </a-col>

      <a-col :span="12">
        <a-card title="表单组件">
          <a-space direction="vertical" :style="{ width: '100%' }">
            <a-input placeholder="Basic usage" />
            <a-input-search placeholder="input search text" />
            <a-select placeholder="Select a option" style="width: 100%">
              <a-select-option value="1">Option 1</a-select-option>
              <a-select-option value="2">Option 2</a-select-option>
              <a-select-option value="3">Option 3</a-select-option>
            </a-select>
            <a-date-picker style="width: 100%" />
            <a-switch default-checked />
          </a-space>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]">
      <a-col :span="24">
        <a-card title="数据展示">
          <a-table :columns="columns" :data-source="dataSource" :pagination="false" />
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-card title="进度条">
          <a-space direction="vertical" :style="{ width: '100%' }">
            <a-progress :percent="30" />
            <a-progress :percent="50" status="active" />
            <a-progress :percent="70" status="exception" />
            <a-progress :percent="100" />
          </a-space>
        </a-card>
      </a-col>

      <a-col :span="12">
        <a-card title="警告提示">
          <a-space direction="vertical" :style="{ width: '100%' }">
            <a-alert message="Success Tips" description="Detailed description and advice about successful copywriting." type="success" show-icon />
            <a-alert message="Informational Notes" description="Additional description and information about copywriting." type="info" show-icon />
            <a-alert message="Warning" description="This is a warning notice about copywriting." type="warning" show-icon />
            <a-alert message="Error" description="This is an error message about copywriting." type="error" show-icon />
          </a-space>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]">
      <a-col :span="24">
        <a-card title="消息提示">
          <a-space>
            <a-button @click="showMessage('success')">成功消息</a-button>
            <a-button @click="showMessage('info')">信息消息</a-button>
            <a-button @click="showMessage('warning')">警告消息</a-button>
            <a-button @click="showMessage('error')">错误消息</a-button>
          </a-space>
          <a-divider orientation="left">带图标消息</a-divider>
          <a-space>
            <a-button @click="showNotification('success')">成功通知</a-button>
            <a-button @click="showNotification('info')">信息通知</a-button>
            <a-button @click="showNotification('warning')">警告通知</a-button>
            <a-button @click="showNotification('error')">错误通知</a-button>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
    
    <a-row :gutter="[16, 16]">
      <a-col :span="24">
        <a-card title="按钮状态效果展示">
          <a-space direction="vertical" :style="{ width: '100%' }">
            <a-divider orientation="left">成功状态按钮</a-divider>
            <a-space>
              <a-button type="primary" @click="handleSuccessClick">成功按钮</a-button>
              <a-button type="primary" danger @click="handleSuccessClick">成功危险按钮</a-button>
              <a-button type="dashed" @click="handleSuccessClick">成功虚线按钮</a-button>
              <a-button ghost type="primary" @click="handleSuccessClick">成功幽灵按钮</a-button>
            </a-space>
            
            <a-divider orientation="left">警告状态按钮</a-divider>
            <a-space>
              <a-button type="primary" @click="handleWarningClick">警告按钮</a-button>
              <a-button type="primary" danger @click="handleWarningClick">警告危险按钮</a-button>
              <a-button type="dashed" @click="handleWarningClick">警告虚线按钮</a-button>
              <a-button ghost type="primary" @click="handleWarningClick">警告幽灵按钮</a-button>
            </a-space>
            
            <a-divider orientation="left">错误状态按钮</a-divider>
            <a-space>
              <a-button type="primary" @click="handleErrorClick">错误按钮</a-button>
              <a-button type="primary" danger @click="handleErrorClick">错误危险按钮</a-button>
              <a-button type="dashed" @click="handleErrorClick">错误虚线按钮</a-button>
              <a-button ghost type="primary" @click="handleErrorClick">错误幽灵按钮</a-button>
            </a-space>
            
            <a-divider orientation="left">信息状态按钮</a-divider>
            <a-space>
              <a-button type="primary" @click="handleInfoClick">信息按钮</a-button>
              <a-button type="primary" danger @click="handleInfoClick">信息危险按钮</a-button>
              <a-button type="dashed" @click="handleInfoClick">信息虚线按钮</a-button>
              <a-button ghost type="primary" @click="handleInfoClick">信息幽灵按钮</a-button>
            </a-space>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { message, notification } from 'ant-design-vue';
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';

interface DataItem {
  key: number;
  name: string;
  age: number;
  address: string;
}

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
  },
];

const dataSource = ref<DataItem[]>([
  {
    key: 1,
    name: '张三',
    age: 32,
    address: '上海市浦东新区',
  },
  {
    key: 2,
    name: '李四',
    age: 42,
    address: '北京市朝阳区',
  },
  {
    key: 3,
    name: '王五',
    age: 30,
    address: '广州市天河区',
  },
]);

const switchTheme = (theme: string) => {
  const body = document.body;
  body.className = body.className.replace(/theme-\w+/, '');
  
  switch (theme) {
    case 'dark':
      body.classList.add('theme-dark');
      break;
    case 'compact':
      body.classList.add('theme-compact');
      break;
    default:
      body.classList.add('theme-default');
      break;
  }
};

const showMessage = (type: string) => {
  switch (type) {
    case 'success':
      message.success('这是一条成功的消息');
      break;
    case 'info':
      message.info('这是一条信息提示的消息');
      break;
    case 'warning':
      message.warning('这是一条警告的消息');
      break;
    case 'error':
      message.error('这是一条错误的消息');
      break;
  }
};

const showNotification = (type: string) => {
  switch (type) {
    case 'success':
      notification.success({
        message: '成功通知',
        description: '这是一条成功的通知'
      });
      break;
    case 'info':
      notification.info({
        message: '信息通知',
        description: '这是一条信息提示的通知'
      });
      break;
    case 'warning':
      notification.warning({
        message: '警告通知',
        description: '这是一条警告的通知'
      });
      break;
    case 'error':
      notification.error({
        message: '错误通知',
        description: '这是一条错误的通知'
      });
      break;
  }
};

// 添加按钮点击处理函数
const handleSuccessClick = () => {
  message.success('成功状态按钮被点击');
};

const handleWarningClick = () => {
  message.warning('警告状态按钮被点击');
};

const handleErrorClick = () => {
  message.error('错误状态按钮被点击');
};

const handleInfoClick = () => {
  message.info('信息状态按钮被点击');
};
</script>

<style scoped lang="scss">
.theme-demo {
  padding: 24px;
}

h1 {
  margin-bottom: 16px;
}

.ant-card {
  margin-bottom: 16px;
}

.success-btn {
  color: #52c41a;
  border-color: #52c41a;
  
  &:hover,
  &:focus {
    color: #73d13d;
    border-color: #73d13d;
  }
}

.info-btn {
  color: #1890ff;
  border-color: #1890ff;
  
  &:hover,
  &:focus {
    color: #40a9ff;
    border-color: #40a9ff;
  }
}

.warning-btn {
  color: #faad14;
  border-color: #faad14;
  
  &:hover,
  &:focus {
    color: #ffc53d;
    border-color: #ffc53d;
  }
}
</style>