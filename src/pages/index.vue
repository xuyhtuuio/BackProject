<template>
  <div class="outer">
    <el-row>
      <el-col :span="6" v-for="(item, index) in panels">
        <el-card shadow="hover" :body-style="{ padding: '10px' ,width: `10px`}" >
          <template #header>
            <div class="card-header">
              <span>{{item.title}}</span>
              <el-tag
                  :key="item.unit"
                  :type="item.type"
                  class="mx-1"
                  effect="light"
              >
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<script setup>
import {getBackStatisticsFirst} from "~/api/backGroundMainPage.js";
import {ref} from "vue";
const panels = ref()
getBackStatisticsFirst().then(r => panels.value = r.data.panels)
</script>

<style scoped>
.el-row {
  transition: all 1.3s;
  display: flex;
  justify-content: space-around
}


:deep(el-card__header) {
  background-color: #dd2280;
}

:deep(.card-header) {
  display: flex;
  height: 10px;
  justify-content: space-between;
  flex-shrink: revert;
  transition: all 1.3s;
}
</style>
