<template>
  <div >
    <el-row :gutter="20">
      <template v-if="panels.length == 0">
        <el-col :span="6" v-for="i in 4" :key="i">
          <el-skeleton style="width: 100%;" animated loading>
            <template #template>
              <el-card shadow="hover" class="border-0">
                <template #header>
                  <div class="flex justify-between">
                    <el-skeleton-item variant="text" style="width: 50%" />
                    <el-skeleton-item variant="text" style="width: 10%" />
                  </div>
                </template>
                <el-skeleton-item variant="h3" style="width: 80%" />
                <el-divider />
                <div class="flex justify-between text-sm text-gray-500">
                  <el-skeleton-item variant="text" style="width: 50%" />
                  <el-skeleton-item variant="text" style="width: 10%" />
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>

      <el-col :span="6" :offset="0" v-for="(item, index) in panels" :key="index" >
      <el-card shadow="hover" class="border-0 ">
        <template #header>
          <div class="flex justify-between">
            <span class="text-sm">{{ item.title }}</span>
            <el-tag :type="item.unitColor" effect="plain" >
              {{ item.unit }}
            </el-tag>
          </div>
        </template>
        <span class="text-3xl font-bold text-gray-500">
                        <CountTo :value="item.value"/>
        </span>
        <el-divider />
        <div class="flex justify-between text-sm text-gray-500">
          <span>{{ item.subTitle }}</span>
          <span>{{ item.subValue }}</span>
        </div>
      </el-card>
    </el-col>
    </el-row>
    <index-navs />

    <el-row :gutter="20" class="mt-5" >
      <el-col :span="12">
        <index-chart v-permission="['getStatistics3,GET']"/>
      </el-col>
      <el-col :span="12" :offset="0" >
        <IndexCard title="店铺及商品提示" tip="店铺及商品提示" :btns="goods" class="mb-3"/>
        <IndexCard title="交易提示" tip="需要立即处理的交易订单" :btns="order"/>
      </el-col>
    </el-row>

  </div>
</template>



<script setup>
import {getBackStatisticsFirst, getBackStatisticsSecond, getBackStatisticsThird} from "~/api/backGroundMainPage.js";
import {ref} from "vue";
import {logout} from "../api/manager.js";
import CountTo from "~/components/CountTo.vue";
import IndexNavs from "~/components/indexNavs.vue";
import IndexChart from "~/components/indexChart.vue";
import IndexCard from "~/components/indexCard.vue";
const panels = ref([])
const goods = ref(null)
const order = ref(null)
getBackStatisticsFirst().then(r => panels.value = Array.from(r.data.panels))
getBackStatisticsSecond().then(r => {
  goods.value = r.data.goods
  order.value = r.data.order
})
</script>

