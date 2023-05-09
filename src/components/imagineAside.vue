<template>
  <el-aside width="220px" class="image-aside" v-loading="loading">
    <div class="top truncate">
      <AsideList v-for="(item, index) in divList" :key="index"
                 @edit="handleEdit(index)"
                 @delete="handleDelete(index)"
                 @click="getActive(index)"
                 :active="ActiveIndex == index"
      >
        <div>{{ item.name }}</div>
      </AsideList>

    </div>
    <div class="bottom">
      <el-pagination background layout="prev, pager, next"
                     :total="total"
                     :page-size="limit"
                     @current-change="handleChangePage"
                     v-model:current-page="currentPage"/>
    </div>
  </el-aside>

  <flod-drawer ref="AddDrawer" submit-msg="增加" title="新增分类" @submit="handleAdd">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="100px" small>
      <el-form-item prop="name" label="名称">
        <el-input v-model="form.name" placeholder="请输入名字"/>
      </el-form-item>
      <el-form-item prop="order" label="排序">
        <el-input-number v-model="form.order" :min="1" :max="50"/>
      </el-form-item>
    </el-form>
  </flod-drawer>

  <flod-drawer ref="ChangeDrawer" submit-msg="修改" title="修改" @submit="handleChange">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="100px" small>
      <el-form-item prop="name" label="名称">
        <el-input v-model="form.name" placeholder="请输入名字"/>
      </el-form-item>
      <el-form-item prop="order" label="排序">
        <el-input-number v-model="form.order" :min="1" :max="50"/>
      </el-form-item>
    </el-form>
  </flod-drawer>
</template>

<script setup>

import AsideList from "~/components/AsideList.vue";
import {
  AddClassicAboutPicture,
  ChangeClassicAboutPicture,
  DeleteClassicAboutPicture,
  getImagineList
} from "~/api/imagineManage.js";

import {reactive, ref} from "vue";
import FlodDrawer from "~/components/flodDrawer.vue";
import {universal} from "~/utils/pop.js";
import popModal from "~/utils/popmodal.js";
import {ElMessage} from "element-plus";
import UploadFile from "~/components/UploadFile.vue";


const divList = ref([])
const loading = ref(false)
const ActiveIndex = ref(0)
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)
const currentIndex = ref(0)

const AddDrawer = ref()

const ChangeDrawer = ref()

const getActive = (index) => {
  ActiveIndex.value = index
  emit("emitCurrentPage", divList.value[ActiveIndex.value].id)
}

const handleChangePage = () => getData(currentPage.value)
const handleDelete = (index) => {
  currentIndex.value = index
  popModal("确定删除？", "warning")
      .then(async () => {
        //靠你自己解决的！！！
        await DeleteClassicAboutPicture(divList.value[currentIndex.value].id)
        //重新请求数据
        getData(currentPage.value)
        universal("删除成功", "牛逼", "success")
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '很明智',
        })
      })
}

const handleEdit = (index) => {
  EditopenDrawer()
  currentIndex.value = index
}

const AddopenDrawer = () => AddDrawer.value.open()

const EditopenDrawer = () => ChangeDrawer.value.open()
const AddcloseDrawer = () => AddDrawer.value.close()
const UploadcloseDrawer = () => UploadDrawer.value.close()
const EditcloseDrawer = () => ChangeDrawer.value.close()


const handleChange = () => ChangeClassicAboutPicture(form, divList.value[currentIndex.value].id)
    .then(r => {
      EditcloseDrawer()
      universal("修改成功", "好厉害", "success")
      getData(currentPage.value)
    })
    .catch(err => console.log('修改失败', err))

const handleAdd = () => AddClassicAboutPicture(form)
    .then(r => {
      AddcloseDrawer()
      universal("增加成功", "好厉害", "success")
      getData(currentPage.value)
    })
    .catch(err => console.log("添加失败", err))



defineExpose({
  AddopenDrawer,
  EditopenDrawer
})

let emit = defineEmits(["emitCurrentPage"]);


function getData(page = 1) {
  loading.value = true
  getImagineList(page)
      .then(e => {
        divList.value = e.data.list
        total.value = e.data.totalCount
        ActiveIndex.value = 0
        getActive(0)
      })
      .finally(() => loading.value = false)
}

getData()

const form = reactive({
  name: "",
  order: "",
})
const rules = {
  name: [
    {
      required: true,
      message: '名称不能为空',
      trigger: 'blur',
    }
  ],
  order: [
    {
      required: true,
    }
  ],
}
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
