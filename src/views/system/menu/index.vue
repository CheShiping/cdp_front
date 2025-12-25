<template>
  <div class="menu-management">
    <a-form :model="query" layout="inline" style="margin-bottom: 20px;">
      <a-form-item label="关键词">
        <a-input v-model:value="query.keyword" placeholder="请输入关键词" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSearch">查询</a-button>
        <a-button @click="handleReset" style="margin-left: 8px;">重置</a-button>
        <!-- 新增一级菜单按钮 -->
        <a-button type="primary" style="margin-left: 8px;" @click="showAddForm(null)">新增菜单</a-button>
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
            <component v-if="getIconComponent(record.meta.icon)" :is="getIconComponent(record.meta.icon)" class="menu-icon" />
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
            <a-button type="link" size="small" @click="showEditForm(record)">编辑</a-button>
            <a-popconfirm
              :title="`确定要删除【${record.meta?.title}】菜单吗？`"
              ok-text="确定"
              cancel-text="取消"
              @confirm="handleDelete(record.id)"
            >
              <a-button type="link" size="small" danger>删除</a-button>
            </a-popconfirm>
            <a-button type="link" size="small" @click="showAddForm(record.id)">新增下级</a-button>
          </a-space>
        </template>
      </template>
    </a-table>

    <!-- 侧边弹框组件 -->
    <MenuForm
      v-model:visible="addFormVisible"
      :form-title="formTitle"
      :parent-id="parentId"
      :current-record="currentRecord"
      @submit="handleAddSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { postMenuTreeInfo, deleteMenuById, addMenu, updateMenu } from '@/api/menu';
import { ref, onMounted } from 'vue';
import type { SysMenuQuery, SysMenuType } from '@/types/SysMenuType';
import { HomeOutlined, SettingOutlined, UserOutlined, ShopOutlined, TagsOutlined, LinkOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import MenuForm from './components/MenuForm.vue'; // 引入侧边弹框组件

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

// 删除菜单
const handleDelete = async (id: string) => {
  try {
    const response = await deleteMenuById(id);
    message.success(response.message || '删除成功');
    // 重新获取菜单列表
    getMenuTree();
  } catch (error: any) {
    console.error('删除菜单失败:', error);
    message.error(error.message || '删除失败，请重试');
  }
};

// 控制侧边弹框显示与隐藏
const addFormVisible = ref(false);
const formTitle = ref('新增菜单');
const parentId = ref<string>(); // 修改类型定义，从string | null改为string | undefined
const currentRecord = ref<SysMenuType | undefined>(undefined); // 修改类型定义，从SysMenuType | null改为SysMenuType | undefined，初始值也改为undefined

// 显示新增表单
const showAddForm = (id: string | null) => {
  console.log('showAddForm called with id:', id); // 调试日志
  parentId.value = id || undefined; // 当id为null时转换为undefined
  formTitle.value = id ? '新增下级菜单' : '新增一级菜单';
  currentRecord.value = undefined; // 重置当前记录为undefined，表示新增
  addFormVisible.value = true; // 确保设置为 true
};

// 显示编辑表单
const showEditForm = (record: SysMenuType) => {
  console.log('showEditForm called with record:', record); // 调试日志
  parentId.value = record.parentId || undefined;
  formTitle.value = '编辑菜单';
  currentRecord.value = record; // 设置当前记录，表示编辑
  addFormVisible.value = true; // 确保设置为 true
};

// 处理新增提交
const handleAddSubmit = (data: SysMenuType) => {
  console.log('新增菜单数据:', data);
  getMenuTree(); // 刷新列表
  addFormVisible.value = false; // 关闭抽屉
  currentRecord.value = undefined; // 重置当前记录为undefined
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