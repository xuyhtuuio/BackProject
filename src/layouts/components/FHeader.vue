<template>
  <div class="outer f-header">
    <div class="flex">
      <div class="logo">
        <el-icon :size="28" class="">
          <Basketball/>
        </el-icon>
        <span>云皓-最坚实的后盾</span>
      </div>

      <el-icon class="icon-btn" @click="handleExpod">
        <expand v-if="$store.state.asideWidth == '250px'"/>
        <fold v-else/>
      </el-icon>
      <el-tooltip effect="dark" content="刷新" placement="bottom">
        <el-icon class="icon-btn" @click="handleRefresh">
          <refresh/>
        </el-icon>
      </el-tooltip>

      <div class="ml-188 flex items-center">
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <el-icon class="icon-btn" @click="handleFullScreen">
            <full-screen v-if="!isFullscreen"/>
            <aim v-else/>
          </el-icon>
        </el-tooltip>

        <el-dropdown class="dropdown">
        <span class="el-dropdown-link">
        <span>
        <el-avatar :size="35" :src="$store.state.user.data.avatar"/>
         </span>
         {{ $store.state.user.data.username }}
         <el-icon class="el-icon--right">
           <arrow-down/>
         </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleChangePassword">修改密码</el-dropdown-item>
              <el-dropdown-item @click="Logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <flodDrawer ref="flodDrawerRef" submit-msg="提交" title="修改密码" @submit="onSubmit">
          <el-form ref="formRef" :rules="rules" :model="form" label-width="100px" small>-->
            <el-form-item prop="oldpassword" label="旧密码">
              <el-input v-model="form.oldpassword" placeholder="请输入旧密码"/>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
              <el-input type="password" v-model="form.password" placeholder="请输入新密码" show-password>
              </el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认新密码">
              <el-input type="password" v-model="form.repassword" placeholder="请确认密码" show-password>
              </el-input>
            </el-form-item>
          </el-form>
        </flodDrawer>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Aim, ArrowDown, Basketball, Expand, Fold, FullScreen, Refresh} from "@element-plus/icons-vue";
import {useFullscreen} from '@vueuse/core'
import {ref} from "vue";
import FlodDrawer from "~/components/flodDrawer.vue";
import {
  encaChangePassword,
  encaFullScreenAndRefreshAndExpod,
  encaLogout
} from "~/hooks/useManger.js";

const flodDrawerRef = ref(null)
const {
  isFullscreen,
  toggle
} = useFullscreen()

const {
  form,
  rules,
  onSubmit
} = encaChangePassword()

const {
  Logout
} = encaLogout()

const {
  handleRefresh,
  handleFullScreen,
  handleChangePassword,
  handleExpod,
} = encaFullScreenAndRefreshAndExpod(toggle, flodDrawerRef)


</script>

<style scoped>
.f-header {
  @apply flex items-center bg-purple-500 text-light-50 fixed top-0 left-0 right-0;
  width: 100%;
  height: 64px;
  z-index: 1000;
}

.el-dropdown {
  color: white;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-indigo-600;
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>
