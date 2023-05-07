<template>
  <router-view />
</template>

<script setup>
</script>

<style>
body {
  @apply bg-gray-100
}

#nprogress .bar {
  background: #dd2280!important;
  height: 5px;
}

::-webkit-scrollbar{
  background-color: rgba(120, 16, 210, 0.1);
  width: 4px;
  height: 6px;
}
::-webkit-scrollbar-corner{
  display: block;
}
::-webkit-scrollbar-thumb{
  border-radius: 8px;
  background-color: plum;
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track{
  border-right-color: transparent;
  border-left-color: transparent;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
