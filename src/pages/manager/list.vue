<template>
  <el-card shadow='never'>
    <ListAddAndRefresh ref="AddAndRefresh" @handle-refresh="Refresh" @handle-add-oth="handleAddNotice"/>
    <div class="main pb-5 pt-5">
      <el-table :data="NoticeList" stripe style="width: 100%" v-loading="loading">
        <el-table-column label="管理员" width="200">
          <template #default="{ row }">
            <div class="flex items-center">
              <el-avatar :size="40" :src="row.avatar">
                <img
                    src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                />
              </el-avatar>
              <div class="ml-3">
                <h6>{{ row.username }}</h6>
                <small>ID:{{ row.id }}</small>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="所属角色" align="center">
          <template #default="{ row }">
            {{ row.role?.name || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template #default="{ row }">
            <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0" :loading="row.statusLoading" :disabled="row.super == 1"  @change="handleStatusChange($event,row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <small v-if="scope.row.super == 1" class="text-sm text-gray-500">暂无操作</small>
            <div v-else>
              <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>

              <el-popconfirm title="是否要删除该管理员？" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(scope.row.id)">
                <template #reference>
                  <el-button text type="primary" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
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

  <flod-drawer ref="formDrawerRef" title="drawerTitle" @submit="handleChangeSubmit">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <ChooseImage v-model="form.avatar"/>
      </el-form-item>
      <el-form-item label="所属角色" prop="role_id">
        <el-select v-model="form.role_id" placeholder="选择所属角色">
          <el-option v-for="item in roles"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="content">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
        </el-switch>
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
import {getMangerList} from "~/api/manager.js";


const AddAndRefresh = ref()
const formDrawerRef = ref()


const total = ref(0)
const limit = ref(10)
const NoticeList = ref([])
const currentPage = ref(1)
const loading = ref(false)
const NoticeId = ref(0)

const handleChangePage = () => getNoticeLs(currentPage.value)


function getNoticeLs(page) {
  loading.value = true
  getMangerList(page)
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
  formDrawerRef.value.open()
  NoticeId.value = row.id
  form.title = row.title
  form.content = row.content
}

const handleChangeSubmit = async () => {
  await changeNotice(NoticeId.value, form)
      .then(r => universal("牛", "修改成功", "success"))
      .catch(err => console.log("修改失败", err))

  //重新获取公告数据
  Refresh()
  formDrawerRef.value.close()
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
  formDrawerRef.value.open()
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
  formDrawerRef.value.close()
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
