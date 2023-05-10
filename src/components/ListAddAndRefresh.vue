<template>
  <div class="top flex ">
    <el-button type="primary" @click="$emit(`handleAddOth`)">
      新增
    </el-button>
    <el-tooltip
        class="box-item"
        effect="dark"
        content="刷新"
        placement="bottom"
    >
      <el-button text class="refresh" @click="$emit(`handleRefresh`)">
        <el-icon :size="15">
          <Refresh/>
        </el-icon>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script setup>
const handleRefresh = (DataFn, page) => DataFn(page)
const handleAddOth = () => {
  console.log(1)
}


defineExpose({
  handleRefresh,
})

defineEmits(["handleRefresh"])
</script>

<style scoped>
.top {
  width: 100%;
}

.refresh {
  margin-left: auto;
}


</style>
