<template>
  <div class="outer">
    <el-drawer
        v-model="drawer"
        :close-on-click-modal="false"
        :title="title"
        size="45%">
      <div class="flodDrawer">
        <div class="main">
          <slot></slot>
        </div>
        <div class="action" v-if="!disapperaButton">
          <el-button type="primary" @click="submit">
            {{submitMsg}}
          </el-button>
          <el-button type="primary" @click="close">
            取消
          </el-button>
      </div>
      </div>
    </el-drawer>
  </div>

</template>

<script setup>
import {ref, defineProps, defineEmits} from "vue";

const drawer = ref(false)
defineProps({
  submitMsg : {
    default: "提交"
  },
  title: {
    default: ""
  },
  disapperaButton: {
    type: Boolean,
    default: false
  }

})

const emit = defineEmits(["submit"])
const submit = () => emit("submit", 1)
const open = () => drawer.value = true
const close = () => drawer.value = false

defineExpose({
  open,
  close
})
</script>

<style  scoped>
.flodDrawer {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}

.action {
  height: 50px;
  @apply mt-auto flex items-center
}
</style>
