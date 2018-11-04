<template>
  <div class="information">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">Information</span>
      </div>
      <div class="text-container item">
        <div class="location">
          <div class="subtitle">Location : </div>
          <div class="name">The Prcific ocean</div>
        </div>
        <div class="space"></div>
        <div class="Coordinate">
          <div class="subtitle">Coordinate : </div>
          <div class="name">0 N 160 W / 0 N 160 W</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'information'
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/card.scss';

.box-card {
  width: 720px;
  margin-right: 18px;

  .text-container {
    display: flex;
  }

  .space {
    margin-right: 120px;
  }
}
</style>
