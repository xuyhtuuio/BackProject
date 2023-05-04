<template>
<div class="navs">
<el-row >
  <el-col :span="2" class="col2">
    <el-card class="row" shadow="hover">
      <div class="flex flex-col items-center justify-center cursor-pointer">
        <el-icon :size="30">
          <help />
        </el-icon>
        <div>xxx</div>
      </div>

    </el-card>
  </el-col>
  <el-col :span="3" class="col2">
    <el-card class="row" shadow="hover">
      <el-icon :size="30">
        <help />
      </el-icon>
      <div>xxx</div>
    </el-card>
  </el-col>
</el-row>
</div>
</template>

<script setup>

</script>

<style  scoped>
.row {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 0;
}

.col2 {
  margin-top: 5px;
  margin-right: 5px;
}

</style>
