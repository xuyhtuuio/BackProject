<template>
  <el-container class="bg-light-100 rounded" :style="{height: (h + `px`)}">
    <el-header class="image-header">Header</el-header>
    <el-container>
      <imagine-aside />
      <imagine-main />
    </el-container>
  </el-container>
</template>

<script setup>
import ImagineAside from "~/components/imagineAside.vue";
import ImagineMain from "~/components/imagineMain.vue";

const windowHeight = window.innerHeight || document.documentElement.clientHeight
const h = windowHeight - 64 - 44 - 40
const hAboutAsideAndMain = h - 60 - 50
</script>

<style scoped>
.image-header{
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}
</style>
