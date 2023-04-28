<template>
  <el-result
      icon="warning"
      title="您访问的页面走丢了"
      sub-title="Please follow the instructions"
  >
    <template #extra>
      <el-button type="primary" @click="scrollup">Back</el-button>
    </template>
  </el-result>
</template>

<script setup>
import {router} from "~/router/index.js";

function scrollup() {
  router.back()
}
</script>

<style>


</style>
