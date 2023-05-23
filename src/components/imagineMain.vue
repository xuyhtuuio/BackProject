<template>
  <el-main class="main" v-loading="loading">
    <div class="top">
      <el-row :gutter="20" class="row">
        <el-col :offset="0"
                :span="6"
                v-for="(item, index) in divList"
                :key="index"
        >
          <el-card shadow="hover" :body-style="{padding : `0px`}" :class="{ 'border-blue-500':item.checked }">

            <el-image fit="cover"
                      :src="item.url"
                      class="imagine"
                      :preview-src-list="[item.url]"
                      :initial-index="0"
            />
            <div class="intro truncate">{{ item.name }}</div>
            <div class="option flex items-center justify-center p-5" style="height: 20px; width: 100% ">
              <div class="checked ml-2 space-x-8" v-if="isChecked" >
                <el-checkbox v-model="item.checked" @change="handleChecked(item)"></el-checkbox>
              </div>
              <el-button text class="option" @click="ResetPictureName(item.id)">重命名</el-button>
              <el-popconfirm
                  title="是否删除该图片？"
                  confirmButtonText="确认"
                  cancelButtonText="取消"
                  @confirm="HandleDeletePicture(item.id)">
                <template #reference>
                  <el-button text class="option" >删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="bottom">
      <el-pagination background layout="prev, pager, next"
                     :total="total"
                     :page-size="limit"
                     @current-change="handleChangePage"
                     v-model:current-page="currentPage"/>
    </div>
  </el-main>

  <flod-drawer ref="UploadDrawer" disappera-button title="上传图片" @submit="handleUpload" >
    <UploadFile :data="{image_class_id}" @success="handleUploadSuccess"/>
  </flod-drawer>
</template>

<script setup>
import {computed, ref} from "vue";
import {changePictureName, DeletePicture, getImagineList, getPictureByClassic} from "~/api/imagineManage.js";
import ImagineItem from "~/components/ImagineItem.vue";
import {universal, universalPopMessage} from "~/utils/pop.js";
import {ElMessage} from "element-plus";
import FlodDrawer from "~/components/flodDrawer.vue";
import UploadFile from "~/components/UploadFile.vue";


const UploadDrawer = ref()




const total = ref(0)
const limit = ref(10)
const loading = ref(false)
const currentPage = ref(1)
const divList = ref([])

const Props = defineProps({
  image_class_id: {
    type: Number,
    default: 168
  },

  isChecked: {
    type: Boolean,
    default: false
  }
})


//控制抽屉开关
const UploadopenDrawer = () => UploadDrawer.value.open()
const UploadcloseDrawer = () => UploadDrawer.value.close()

//处理图片上传
const handleUpload = () => {
  UploadcloseDrawer()
}

const handleChangePage = () => getPictureDataByPageAndId(currentPage.value, Props.image_class_id)

async function getPictureDataByPageAndId(page = 1, id) {
  loading.value = true
  await getPictureByClassic(id, page)
      .then(e => {
        console.log(e)
        divList.value = e.data.list.map(item => {
          item.checked = false
          return item
        })
        total.value = e.data.totalCount
      })
      .finally(() => loading.value = false)
}

getPictureDataByPageAndId(1, Props.image_class_id)

const inputValue = ref("")
const ResetPictureName = async (PictureId) => {
   await universalPopMessage("请输入要修改图片的名称", "修改", "修改", "取消")
      .then(({value}) => {
        ElMessage({
          type: 'success',
          message: `修改成功`,
        })
        inputValue.value = value
      })
   changePictureName(PictureId, inputValue.value).then(r => getPictureDataByPageAndId(currentPage.value, Props.image_class_id))
}


const HandleDeletePicture = (PictureId) => DeletePicture([PictureId])
    .then(r => getPictureDataByPageAndId(currentPage.value, Props.image_class_id))
    .catch(err => console.log(err))

const handleUploadSuccess = () => {
  getPictureDataByPageAndId(currentPage.value, Props.image_class_id)
      .then(r => {
        UploadcloseDrawer()
        universal("好棒", "🏅️", "success")
      })
}

//获取已经被点击的
const HasCheckedBox = computed(() => divList.value.filter((item, index) => item.checked))

const handleChecked = (item) => {
  emit("emitImagineURL", item.url)
  if(item.checked && HasCheckedBox.value.length > 1) {
    item.checked = false
    universal("不行", "最多只能选中一张","error")
  }
}


defineExpose({
  getPictureDataByPageAndId,
  UploadopenDrawer
})


const emit = defineEmits(["JustGetData", "emitImagineURL"])

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

.row {
  padding: 15px;
}

.el-col {
  margin-bottom: 15px;
}

.imagine {
  width: 100%;
  height: 150px;
  display: block;
}

.intro {
  background-color: rgba(126, 116, 116, 0.5);
  margin-top: -34px;
  z-index: 100;
  position: relative;
  color: #eeeeee;
  box-sizing: border-box;
  padding: 5px;
  text-align: left;
}

.option {
  color: dodgerblue;

}
</style>
