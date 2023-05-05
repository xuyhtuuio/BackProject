<template>
  <div class="indexCharts">
    <el-card shadow="never">
      <template #header>
        <div class="flex justify-between">
          <span class="text-sm">订单统计</span>
          <div>
            <template v-for="(item, index) in options" :key="index">
              <el-button @click="textForemit(item.value)">{{ item.text }}</el-button>
            </template>
          </div>
        </div>
      </template>
      <div ref="el" id="chart" style="width: 100%;height: 300px;"></div>
    </el-card>
  </div>
</template>

<script setup>
import {getBackStatisticsThird} from "~/api/backGroundMainPage.js";
import * as echarts from 'echarts';
import {onBeforeUnmount, ref} from "vue";
import {useResizeObserver} from "@vueuse/core";

var chartDom = null
let xData = ref([])
let yData = ref([])
let option = null
let myChart = null

function getData(type) {
  //如果有myChart那么就会展示等待效果
  myChart && myChart.showLoading()

  //请求数据
  getBackStatisticsThird(type).then(r => {
    xData.value = Array.from(r.data.x)
    yData.value = Array.from(r.data.y)

    option = getPictData()
    chartDom = document.getElementById('chart');

    //初始化myChart
    myChart = echarts.init(chartDom, null, {
      height: 350
    });
    option && myChart.setOption(option);
    myChart.hideLoading()
  })
}

const textForemit = (type) => getData(type)

//立即请求数据
getData("month")

const options = [
  {
    text: "近1个月",
    value: "month"
  },
  {
    text: "近1周",
    value: "week"
  },
  {
    text: "近24小时",
    value: "hour"
  }]

const getPictData = () => {
  return {
    xAxis: {
      type: 'category',
      data: xData.value
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: yData.value,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(130, 130, 180, 0.2)'
        }
      }
    ]
  }
}

//组件卸载的时候进行图表的卸载
onBeforeUnmount(() => myChart && echarts.dispose(myChart))

//将图表进行适配
const el = ref(null)
useResizeObserver(el, (entries) => myChart.resize())
</script>

