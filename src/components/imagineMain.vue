<template>
  <el-main class="main">
    <div class="top">
      <div v-for="item in 100">{{ item }}</div>
    </div>
    <div class="bottom">1 / 2 / 3</div>
  </el-main>
</template>

<script setup>

</script>

<style scoped>
.main {
  border-right: 1px solid #eeeeee;
  position: relative;
}

.main .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}

.main .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}

</style>
