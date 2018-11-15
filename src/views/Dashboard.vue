<template>
  <div class="dashboard">
    <div class="illust">
      <img src="@/assets/images/illust.png">
    </div>
    <el-row class="tac" :gutter="20">
      <el-col class="nav" :span="4">
        <v-sidebar></v-sidebar>
      </el-col>
      <el-col class="board" :span="20">
        <div class="container">
          <div class="item-page">
            <v-topbar></v-topbar>
          </div>
          <div class="item-page">
            <information-weaver></information-weaver>
            <energy-weaver></energy-weaver>
          </div>
          <div class="item-page">
            <location-weaver></location-weaver>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VSidebar from '@/components/Sidebar'
import VTopbar from '@/components/cards/Topbar'
import InformationWeaver from '@/components/cards/InformationWeaver'
import EnergyWeaver from '@/components/cards/EnergyWeaver'
import LocationWeaver from '@/components/cards/LocationWeaver'

export default {
  name: 'dashboard',
  components: {
    VSidebar,
    VTopbar,
    InformationWeaver,
    EnergyWeaver,
    LocationWeaver
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex-direction: row;
}

.illust {
  z-index: -1;

  & > img {
    width: 500px;
    position: absolute;
    bottom: 50px;
    right: 10px;
  }
}

.board {
  margin-top: 20px;
}

.container {
  width: 1280px;
  display: flex;
  flex-direction: column;
}

.item-page {
  margin: 10px;
}
</style>
