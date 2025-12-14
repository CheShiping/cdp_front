<template>
  <a-layout-content class="content">
    <div class="content-wrapper">
      Content
    </div>
  </a-layout-content>
</template>

<style scoped lang="scss">
.content {
  background-color: var(--ant-component-background);
  padding: 24px;
  height: calc(100vh - 64px - 69px); // header高度 + footer高度
  overflow: auto;
  
  .content-wrapper {
    background: var(--mxg-content-color);
    padding: 24px;
    min-height: 100%;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #999;
  }
}
</style>