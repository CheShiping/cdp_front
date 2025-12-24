<template>
  <a-drawer
    :title="formTitle"
    :visible="visible"
    :width="500"
    @close="handleCancel"
    :mask-closable="false"
  >
    <a-form :model="formData" :rules="formRules" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" ref="formRef">

      <a-form-item label="上级菜单" name="parentId">
        <a-cascader
          v-model:value="formData.parentId"
          :options="options"
          expand-trigger="hover"
          placeholder="请选择上级菜单"
        />
      </a-form-item>

      <a-form-item label="菜单类型:" name="type">
        <a-radio-group v-model:value="formData.type">
          <a-radio value="1">菜单</a-radio>
          <a-radio value="2">按钮</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="菜单名称:" name="name">
        <a-input v-model:value="formData.name" placeholder="请输入菜单名称" />
      </a-form-item>

      <a-form-item label="路由地址:" name="path">
        <a-input v-model:value="formData.path" placeholder="路由地址path值" />
      </a-form-item>

      <a-form-item label="路由名称:" name="routeName">
        <a-input v-model:value="formData.routeName" placeholder="路由名称" />
      </a-form-item>

      <a-form-item label="组件路径:" name="component">
        <a-input v-model:value="formData.component" placeholder="路由组件相对路径" />
      </a-form-item>

      <a-form-item label="菜单图标:" name="icon">
        <a-input v-model:value="formData.meta.icon" placeholder="请输入图标名英文小写" />
      </a-form-item>

      <a-form-item label="重定向:" name="redirect">
        <a-input v-model:value="formData.redirect" placeholder="路由重定向地址redirect值" />
      </a-form-item>

      <a-form-item label="是否隐藏:" name="hidden">
        <a-radio-group v-model:value="formData.hidden">
          <a-radio :value="false">不隐藏</a-radio>
          <a-radio :value="true">隐藏</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="是否缓存:" name="cache">
        <a-radio-group v-model:value="formData.cache">
          <a-radio :value="false">不缓存</a-radio>
          <a-radio :value="true">缓存</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="排序:" name="sort">
        <a-input-number v-model:value="formData.sort" :min="0" />
      </a-form-item>

      <a-form-item label="备注:" name="remark">
        <a-input v-model:value="formData.remark" placeholder="请输入备注" />
      </a-form-item>
    </a-form>


    <div class="drawer-footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" @click="handleSubmit">确定</a-button>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { SysMenuQuery, SysMenuType } from '@/types/SysMenuType';
import type { FormInstance } from 'ant-design-vue';
import { getMenuSelect } from '@/api/menu';

interface Props {
  visible: boolean;
  formTitle: string;
  parentId?: string; // 用于新增子菜单时传递父级ID
}

interface Emits {
  (e: 'update:visible', visible: boolean): void;
  (e: 'submit', data: SysMenuType): void;
}

interface Option {
  value: string | number;
  label?: any;
  disabled?: boolean;
  children?: Option[];
  // 标记是否为叶子节点，设置了 `loadData` 时有效
  // 设为 `false` 时会强制标记为父节点，即使当前节点没有 children，也会显示展开图标
  isLeaf?: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const options = ref()
const loadMenuSelect = async () => {
  const res = await getMenuSelect()
  if (res.code !== 200) return;
  
  // 转换API返回的数据为Cascader所需的格式
  const transformMenuData = (menuList: any[]): Option[] => {
    return menuList.map(item => ({
      value: item.id,
      label: item.title,
      disabled: item.disabled || false,
      children: item.children ? transformMenuData(item.children) : undefined
    }))
  }
  
  options.value = transformMenuData(res.data as SysMenuType[]);
}

onMounted(() => loadMenuSelect())

// 表单数据
// 修改 formData 结构
const formData = ref<SysMenuType>({
  id: '',
  name: '',
  path: '',
  component: '',
  code: '',
  sort: 0,
  meta: {
    title: '',
    icon: '',
    linkTo: null,
    cache: false,
    hidden: false,
    isBreadcrumb: true
  },
  parentId: null,
  redirect: null,
  remark: null,
  createTime: '',
  updateTime: '',
  children: [],
  type: '1',
  routeName: '',
  hidden: false, // 提升
  cache: false   // 提升
});

// 表单验证规则
const formRules = {
  name: [
    {
      required: true,
      message: '请输入菜单名称',
      trigger: 'blur'
    }
  ],
  type: [
    {
      required: true,
      message: '请选择菜单类型',
      trigger: 'change'
    }
  ],
  hidden: [
    {
      required: true,
      message: '请选择是否隐藏',
      trigger: 'change'
    }
  ],
  cache: [
    {
      required: true,
      message: '请选择是否缓存',
      trigger: 'change'
    }
  ]
};

// 获取表单实例
const formRef = ref<FormInstance>();

// 处理表单提交
const handleSubmit = async () => {
  try {
    await formRef.value?.validateFields();

    // 提交前，同步回 meta
    formData.value.meta.hidden = formData.value.hidden;
    formData.value.meta.cache = formData.value.cache;

    emits('submit', formData.value);
    emits('update:visible', false);
  } catch (error) {
    console.log('表单验证失败', error);
  }
};

// 关闭抽屉
const handleCancel = () => {
  emits('update:visible', false);
};
</script>

<style scoped>
.drawer-footer {
  text-align: right;
  margin-top: 20px;
}
</style>