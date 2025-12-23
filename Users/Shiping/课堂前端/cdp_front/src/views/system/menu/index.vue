
<template>
  <div class="menu-management">
    <a-form :model="query" layout="inline" style="margin-bottom: 20px;">
      <!-- ... existing code ... -->
    </a-form>

    <!-- ... existing code ... -->

    <a-table 
      :columns="columns" 
      :data-source="tableData" 
      :row-selection="rowSelection"
      :row-key="getRowKey"
      :pagination="false"
      :default-expand-all-rows="true"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.key === 'name'">
          <span>
            <component :is="record.meta.icon ? `icon-${record.meta.icon}` : 'IconDefault'" />
            {{ record.meta.title }}
          </span>
        </template>
        <template v-else-if="column.key === 'type'">
          <!-- ... existing code ... -->
        </template>
        <template v-else-if="column.key === 'meta.hidden'">
          <!-- ... existing code ... -->
        </template>
        <template v-else-if="column.key === 'actions'">
          <!-- ... existing code ... -->
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { postMenuTreeInfo } from '@/api/menu';
import { ref, onMounted } from 'vue';
import type { SysMenuQuery, SysMenuType } from '@/types/SysMenuType';

// 表格列定义
const columns = [
  {
    title: '菜单名称',
    key: 'name', // 修改为 name，以便在模板中处理图标和标题
  },
  {
    title: '类型',
    key: 'type',
  },
  {
    title: '路径',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: '组件',
    dataIndex: 'component',
    key: 'component',
  },
  {
    title: '权限标识',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
  },
  {
    title: '是否隐藏',
    key: 'meta.hidden',
  },
  {
    title: '操作',
    key: 'actions',
  },
];

</script>

<style scoped>
.menu-management {
  padding: 20px;
}
</style>