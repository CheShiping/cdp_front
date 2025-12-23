<template>
  <div class="menu-management">
    <a-form :model="query" layout="inline" style="margin-bottom: 20px;">
      <a-form-item label="关键词">
        <a-input v-model:value="query.keyword" placeholder="请输入关键词" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSearch">查询</a-button>
        <a-button @click="handleReset" style="margin-left: 8px;">重置</a-button>
      </a-form-item>
    </a-form>

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
            <svg-icon v-if="record.meta.icon && record.meta.icon.startsWith('svg-')" :name="record.meta.icon.substring(4)" class="menu-icon" />
            <component v-else-if="getIconComponent(record.meta.icon)" :is="getIconComponent(record.meta.icon)" class="menu-icon" />
            <span v-else style="display: inline-block; width: 1em;"></span>
            <span style="margin-left: 8px;">{{ record.meta.title }}</span>
          </span>
        </template>
        <template v-else-if="column.key === 'type'">
          <a-tag :color="record.type === '1' ? 'blue' : 'green'">
            {{ record.type === '1' ? '菜单' : '按钮' }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'meta.hidden'">
          <a-tag :color="record.meta.hidden ? 'red' : 'green'">
            {{ record.meta.hidden ? '隐藏' : '显示' }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'actions'">
          <a-space>
            <a-button type="link" size="small">编辑</a-button>
            <a-button type="link" size="small" danger>删除</a-button>
            <a-button type="link" size="small" @click="handleAddChild(record)">新增下级</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { postMenuTreeInfo } from '@/api/menu';
import { ref, onMounted } from 'vue';
import type { SysMenuQuery, SysMenuType } from '@/types/SysMenuType';
import { HomeOutlined, SettingOutlined, UserOutlined, ShopOutlined, TagsOutlined, LinkOutlined } from '@ant-design/icons-vue';
import SvgIcon from '@/components/svgIcon/index.vue';

// 表格列定义
const columns = [
  {
    title: '菜单名称',
    key: 'name',
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

// 查询参数
const query = ref<SysMenuQuery>({ keyword: '' });

// 表格数据
const tableData = ref<SysMenuType[]>([]);

// 定义获取行键的函数
const getRowKey = (record: SysMenuType) => record.id;

// 将后端传来的图标名称转换为组件
const getIconComponent = (iconName: string | null) => {
  if (!iconName) return null;
  
  // 将图标名称转换为Ant Design Vue图标组件名称
  // 例如：home -> HomeOutlined
  const pascalCaseIcon = iconName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  // 检查是否是已导入的图标
  const iconsMap: Record<string, any> = {
    HomeOutlined,
    SettingOutlined,
    UserOutlined,
    ShopOutlined,
    TagsOutlined,
    LinkOutlined,
  };
  
  return iconsMap[pascalCaseIcon + 'Outlined'] || null;
};

// 获取菜单树数据
const getMenuTree = async () => {
  const res = await postMenuTreeInfo(query.value);
  if (res.data) {
    tableData.value = res.data as SysMenuType[];
  } else {
    tableData.value = [];
  }
};

// 处理查询
const handleSearch = async () => {
  await getMenuTree();
};

// 处理重置
const handleReset = () => {
  query.value = { keyword: '' };
  getMenuTree();
};

// 行选择配置
const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record: any, selected: any, selectedRows: any) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
    console.log(selected, selectedRows, changeRows);
  },
});

// 新增下级
const handleAddChild = (record: SysMenuType) => {
  console.log('Add child for:', record);
  // 这里可以添加具体的业务逻辑
};

onMounted(() => {
  getMenuTree();
});
</script>

<style scoped>
.menu-management {
  padding: 20px;
}
.menu-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
}
</style>