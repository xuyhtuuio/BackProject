<template>
  <el-aside width="220px" class="image-aside" v-loading="loading">
    <div class="top truncate">
      <AsideList v-for="(item, index) in divList" :key="index"
                 @edit="handleEdit"
                 @delete="handleDelete"
                 @click="getActive(index)"
                 :active="ActiveIndex == index"
      >
        <div>{{ item.name }}</div>
      </AsideList>

      <!--      <div v-for="item in 100" >{{item}}</div>-->
    </div>
    <div class="bottom">
      <el-pagination background layout="prev, pager, next"
                     :total="total"
                     :page-size="limit"
                     @current-change="handleChangePage"
                     v-model:current-page="currentPage"/>
    </div>
  </el-aside>
</template>

<script setup>

import AsideList from "~/components/AsideList.vue";
import {getImagineList} from "~/api/imagineManage.js";
import {ref} from "vue";


const divList = ref([])
const loading = ref(false)
const ActiveIndex = ref(0)
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)

const getActive = (index) => ActiveIndex.value = index
const handleChangePage = () => getData(currentPage.value)

const handleDelete = () => console.log("Delete")
const handleEdit = () => console.log("Edit")

function getData(page = 1) {
  loading.value = true
  getImagineList(page)
      .then(e => {
        divList.value = e.data.list
        total.value = e.data.totalCount
        ActiveIndex.value = 0
      })
      .finally(() => loading.value = false)
}

getData()
</script>

<style scoped>
.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;
}

.image-aside .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-aside .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
</style>
