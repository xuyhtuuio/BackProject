<template>
  <el-main class="main" v-loading="loading">
    <div class="top">
      <imagine-item v-for="(item, index) in divList">
        {{ item }}
      </imagine-item>
    </div>
    <div class="bottom">
      <el-pagination background layout="prev, pager, next"
                     :total="total"
                     :page-size="limit"
                     @current-change="handleChangePage"
                     v-model:current-page="currentPage"/>
    </div>

  </el-main>
</template>

<script setup>
import {ref} from "vue";
import {getImagineList, getPictureByClassic} from "~/api/imagineManage.js";
import ImagineItem from "~/components/ImagineItem.vue";

const total = ref(0)
const limit = ref(10)
const loading = ref(false)
const currentPage = ref(1)
const divList = ref([])


const Props = defineProps({
  id: {
    type: Number,
    default: 173
  }
})


const handleChangePage = () => getPictureDataByPageAndId(currentPage.value, Props.id)

async function getPictureDataByPageAndId(page = 1, id) {
  console.log(Props.id)
  loading.value = true
  await getPictureByClassic(id, page)
      .then(e => {
        console.log(e)
        divList.value = e.data.list
        total.value = e.data.totalCount
      })
      .finally(() => loading.value = false)
}

getPictureDataByPageAndId(1, Props.id)


defineExpose({
  getPictureDataByPageAndId
})
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
