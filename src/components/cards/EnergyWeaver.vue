<template>
  <div class="energy">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">Energy</span>
      </div>
      <div class="text item">
        <div class="radialbar">
          <el-progress type="circle" :percentage="80" stroke-width="20"></el-progress>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'energy'
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/card.scss';

.box-card {
  width: 470px;
  text-align: center;
}
</style>
