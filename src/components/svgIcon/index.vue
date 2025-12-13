<script setup lang="ts">
import { h, resolveComponent, type CSSProperties } from 'vue';

const props = withDefaults(defineProps<{
  name?: string,  // 图标名称
  fill?: string,   // 图标颜色
  width?: number | string,  // 图标宽度
  height?: number | string, // 图标高度
  rotate?: number,  // 图标旋转角度（ie9无效
  spin?: boolean,   // 是否有旋转动画 默认false
  style?: CSSProperties,  // 设置图标的样式，列如fontSize 和color
  twoToneColor?: string // 仅适用于双色图标，设置双色图标的主要颜色
  
}>(), {
  name: '',
  width: 18,
  height: 18
})

const render = () => {
  const iconProps = {
    fill: props.fill,
    width: props.width,
    height: props.height,
    rotate: props.rotate,
    spin: props.spin,
    style: props.style,
    twoToneColor: props.twoToneColor
  };
  
  return h(
    resolveComponent('a-icon'), 
    iconProps, 
    () => h(resolveComponent(props.name))
  );
};

</script>

<template>
  <component :is="render()" />
</template>

<style lang="scss" scoped>

</style>