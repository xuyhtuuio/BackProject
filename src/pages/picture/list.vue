<template>
  <el-container class="bg-light-100 rounded" :style="{height: (h + `px`)}">
    <el-header class="image-header">
      <el-button @click="handleAddCLassicAbPicture" size="small" type="primary">新增图片分类</el-button>
      <el-button @click="handleUploadPicture" size="small" type="warning">⏫图片</el-button>
    </el-header>
    <el-container>
      <imagine-aside ref="imagineAside" @emitCurrentPage="getCurrentIDAndBeginEmit"/>
      <imagine-main :id="ImagineId" ref="imagineMain"/>
    </el-container>
  </el-container>
</template>

<script setup>
import ImagineAside from "~/components/imagineAside.vue";
import ImagineMain from "~/components/imagineMain.vue";
import {ref} from "vue";

const windowHeight = window.innerHeight || document.documentElement.clientHeight
const h = windowHeight - 64 - 44 - 40
const imagineAside = ref()
const ImagineId = ref()
const imagineMain = ref()
const handleAddCLassicAbPicture = () => imagineAside.value.AddopenDrawer()
const handleUploadPicture = () => imagineAside.value.UploadopenDrawer()

const getCurrentIDAndBeginEmit = (ID) => {
  ImagineId.value = ID
  imagineMain.value.getPictureDataByPageAndId(1, ID)
}

</script>

<style scoped>
.image-header {
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;

}
</style>
