<template>
  <div class="Menu" :style="{ width:$store.state.asideWidth }">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
            :default-active="activePath"
            default-active="2"
            class="border-0"
            @select="handleSelect"
            :collapse="isCollapse"
            :collapse-transition="false"
            unique-opened
        >
          <template v-for="(item,index) in userMenu" :key="index">
            <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
              <template #title>
                <el-icon>
                  <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item v-for="(item2,index2) in item.child" :key="index2" :index="item2.frontpath">
                <el-icon>
                  <component :is="item2.icon"></component>
                </el-icon>
                <span>{{ item2.name }}</span>
              </el-menu-item>
            </el-sub-menu>

            <el-menu-item v-else :index="item.frontpath">
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {router} from "~/router/index.js";
import {computed, ref} from "vue";
import store from "~/store/index.js";
import {useRoute} from "vue-router";

const route = useRoute()
const userMenu = store.state.user.data.menus

const isCollapse = computed(() => {
  return store.state.asideWidth == "300px" ? false : true
})

const activePath = ref(route.path)
const handleSelect = (index) => {
  //跳转
  router.push(index)
}

</script>

<style>
.Menu {
  transition: all 0.8s;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  @apply shadow-md fixed bg-light-50;
}
</style>
