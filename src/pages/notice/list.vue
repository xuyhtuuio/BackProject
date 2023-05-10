<template>
  <el-card shadow='never'>
    <ListAddAndRefresh ref="AddAndRefresh" @handle-refresh="Refresh" @handle-add-oth="handleAddNotice"/>
    <div class="main pb-5 pt-5">
      <el-table :data="NoticeList" table-layout="fixed" style="width: 100%" v-loading="loading" stripe>
        <el-table-column prop="title" label="公告标题"/>
        <el-table-column prop="create_time" label="发布时间" width="380"/>
        <el-table-column align="center" label="操作" width="180">
          <template #default="scope">
            <el-button size="small"
                       @click="handleEdit(scope.$index, scope.row)"
                       text
                       type="primary">
              修改
            </el-button>
            <el-popconfirm title="是否要删除该公告？" confirmButtonText="确认" cancelButtonText="取消"
                           @confirm="handleDelete(scope.$index, scope.row)">
              <template #reference>
                <el-button
                    size="small"
                    type="danger"
                    text
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="bottom flex justify-center align-center">
      <el-pagination background layout="prev, pager, next"
                     :total="total"
                     :page-size="limit"
                     @current-change="handleChangePage"
                     v-model:current-page="currentPage"/>
    </div>
  </el-card>

  <flod-drawer ref="flodDrawarC" title="修改公告" @submit="handleEditSubmit">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
      <el-form-item label="公告标题" prop="title">
        <el-input v-model="form.title" placeholder="公告标题"></el-input>
      </el-form-item>
      <el-form-item label="公告内容" prop="content">
        <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5"></el-input>
      </el-form-item>
    </el-form>
  </flod-drawer>

  <flod-drawer ref="flodDrawarA" title="增加公告" @submit="handleAddSubmit">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
      <el-form-item label="公告标题" prop="title">
        <el-input v-model="form.title" placeholder="公告标题"></el-input>
      </el-form-item>
      <el-form-item label="公告内容" prop="content">
        <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5"></el-input>
      </el-form-item>
    </el-form>
  </flod-drawer>
</template>

<script setup>
import {reactive, ref} from "vue";
import ListAddAndRefresh from "~/components/ListAddAndRefresh.vue";
import {AddNoticeList, changeNotice, DeleteNotice, getNoticeList} from "~/api/NoticeMange.js";
import FlodDrawer from "~/components/flodDrawer.vue";
import {universal} from "~/utils/pop.js";


const AddAndRefresh = ref()
const flodDrawarC = ref()
const flodDrawarA = ref()

const total = ref(0)
const limit = ref(10)
const NoticeList = ref([])
const currentPage = ref(1)
const loading = ref(false)
const NoticeId = ref(0)

const handleChangePage = () => getNoticeLs(currentPage.value)


function getNoticeLs(page) {
  loading.value = true
  getNoticeList(page)
      .then(r => {
        NoticeList.value = r.data.list
        total.value = r.data.totalCount
      })
      .catch(err => console.log("获取失败", err))
      .finally(() => loading.value = false)
}

getNoticeLs(currentPage.value)


//处理刷新
const Refresh = () => AddAndRefresh.value.handleRefresh(getNoticeLs, currentPage.value)

//处理修改
const handleEdit = (index, row) => {
  flodDrawarC.value.open()
  NoticeId.value = row.id
  form.title = row.title
  form.content = row.content
}

const handleEditSubmit = async () => {
  await changeNotice(NoticeId.value, form)
      .then(r => universal("牛", "修改成功", "success"))
      .catch(err => console.log("修改失败", err))

  //重新获取公告数据
  Refresh()
  flodDrawarC.value.close()
}


//处理删除
const handleDelete = async (index, row) => {
  await DeleteNotice(row.id)
      .then(r => universal("牛", "删除成功", "success"))
      .catch(err => console.log("删除失败", err))

  Refresh()
}


//处理新增
const handleAddNotice = () => {
  flodDrawarA.value.open()
  //清空内容
  if(form.title || form.content) {
    form.title = form.content = ""
  }
}


const handleAddSubmit = async () => {
  await AddNoticeList(form)
      .then(r => universal("牛", "新增成功", "success"))
      .catch(err => console.log("增加失败", err))


  Refresh()
  flodDrawarA.value.close()

}



const form = reactive({
  title: "",
  content: ""
})

const rules = {
  title: [{
    required: true,
    message: '公告标题不能为空',
    trigger: 'blur'
  }],
  content: [{
    required: true,
    message: '公告内容不能为空',
    trigger: 'blur'
  }]
}
</script>

<style scoped>

</style>
