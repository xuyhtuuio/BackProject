<template>
<div class="count">
{{p.num.toFixed(0)}}
</div>
</template>

<script setup>
import {gsap} from "gsap";
import {reactive, watch} from "vue";

const Props = defineProps({
  value : {
    type: Number,
    default: 10
  }
})

const p = reactive({
  num: 0
})

function AnimToValue () {
  gsap.to(p,{
    direction: 1,
    num:Props.value
  })
}

AnimToValue()

watch(() => Props.value, () => AnimToValue())
</script>

<style scoped>

</style>
