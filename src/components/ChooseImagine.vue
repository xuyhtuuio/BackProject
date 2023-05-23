<template>
<div class="outer">
  <div class="imagineAndChoose flex">
    <div class="choosedImagine">
      <el-image :src="modelValue" fit="cover" class="h-[100px] w-[100px] mr-3 rounded border" ></el-image>
    </div>

    <div class="choose-image-btn" @click="open">
      <el-icon :size="25" class="text-gray-500"><Plus /></el-icon>
    </div>
  </div>
  <el-dialog
      title="选择图片"
      v-model="dialogVisible"
      width="80%"
      top="2vh">

    <el-container class="bg-white rounded" style="height:70vh;">
      <el-header class="image-header">
        <div class=" rounded h-[50px] w-[150px] flex justify-center items-center backdrop-filter backdrop-blur xx"  >只能选一张哦</div>
      </el-header>
      <el-container>
        <ImagineAside ref="imageAside" @emitCurrentPage="getCurrentIDAndBeginEmit"/>
        <ImagineMain :image_class_id="ImagineId" ref="imagineMain" is-checked @emitImagineURL="acceptURL"/>
      </el-container>
    </el-container>

    <template #footer>
            <span>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submit">上传</el-button>
            </span>
    </template>
  </el-dialog>
</div>
</template>

<script setup>
import ImagineAside from "~/components/imagineAside.vue";
import ImagineMain from "~/components/imagineMain.vue";
import {ref} from "vue";

const dialogVisible = ref(false)
const callbackFunction = ref(null)

const imageAside = ref()
const ImagineId = ref()
const imagineMain = ref()
const URL = ref()


let props = defineProps({
  modelValue:[String,Array],
  limit:{
    type:Number,
    default:1
  },
  preview:{
    type:Boolean,
    default:true
  }
})


console.log(props.modelValue)
const open = (callback = null)=>{
  callbackFunction.value = callback
  dialogVisible.value = true

}

const getCurrentIDAndBeginEmit = (ID) => {
  console.log(ID)
  ImagineId.value = ID
  imagineMain.value.getPictureDataByPageAndId(1, ID)
}



const acceptURL = (ImagineURL) => URL.value = ImagineURL

const submit = () => {
  dialogVisible.value = false
  emit("emitURL", URL.value)

}


const emit = defineEmits(["emitURL"])



</script>

<style >
.image-header{
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}
.choose-image-btn {
  @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover:(bg-gray-100);
}

.xx {
  font-size: larger;
}
</style>
