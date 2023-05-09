<template>
<el-upload
    class="upload-demo"
    drag
    :action="UploadAPI"
    multiple
    :headers="{token}"
    :data="data"
    :on-success="handleUploadSuccess"
    :on-error="text"
    name="img"
>
<el-icon class="el-icon--upload"><upload-filled /></el-icon>
<div class="el-upload__text">
  将文件拖到这里或者 <em>点击这个上传</em>就好啦！
</div>
<template #tip>
  <div class="el-upload__tip">
    jpg/png 文件最大不超过500KB!
  </div>
</template>
</el-upload>
</template>


<script setup>
import {UploadAPI} from "~/api/imagineManage.js";
import {getToken} from "~/utils/auth.js";


const token = getToken()


const emit = defineEmits(["success"])
  const handleUploadSuccess = (response, uploadFile, uploadFiles)=>{
    console.log(response);
    emit("success",{
      response, uploadFile, uploadFiles
    })
}


const Props = defineProps({
  data: {
    type: Object
  }
})

const text = () => {}
</script>
