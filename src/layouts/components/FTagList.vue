<template>
  <div class="f-tag-list" :style="{ left:$store.state.asideWidth }">
    <el-tabs
        v-model="activeTab"
        type="card"
        class="demo-tabs"
        @tab-remove="removeTab"
        style="min-width: 100px"
        @tab-click="jumpToRoute"
    >
      <el-tab-pane
          v-for="item in tabList"
          :closable="item.path != '/'"
          :key="item.path"
          :label="item.title"
          :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>

    <span class="tag-btn">
    <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      <el-icon>
        <arrow-down/>
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="closeOther">关闭其他</el-dropdown-item>
        <el-dropdown-item @click="closeAll">全部关闭</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  </span>
  </div>
  <div style="height: 44px"></div>

</template>
<script setup>
import {encaTagList} from "~/hooks/useTagList.js";

const {
  activeTab,
  tabList,
  jumpToRoute,
  removeTab,
  closeOther,
  closeAll
} = encaTagList();

</script>

<style scoped>
.f-tag-list {
  @apply fixed bg-gray-100 flex items-center px-2;
  top: 64px;
  right: 0;
  height: 44px;
  z-index: 100;
  transition: all 0.9s;
}

.tag-btn {
  @apply bg-white rounded ml-auto flex items-center justify-center px-2;
  height: 32px;
}

:deep(.el-tabs__header) {
  border: 0 !important;
  @apply mb-0;
}

:deep(.el-tabs__nav) {
  border: 0 !important;
}

:deep(.el-tabs__item) {
  border: 0 !important;
  height: 32px;
  line-height: 32px;
  @apply bg-white mx-1 rounded;
}

:deep(.el-tabs__nav-next), :deep(.el-tabs__nav-prev) {
  line-height: 32px;
  height: 32px;
}

:deep(.is-disabled) {
  cursor: not-allowed;
  @apply text-gray-300;
}

:deep(.el-tabs) {
  --el-tabs-header-height: 34px;
}
</style>
