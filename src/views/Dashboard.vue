<template>
  <div class="dashboard">
    <el-row class="tac" :gutter="20">
      <el-col class="nav" :span="4">
        <v-navbar></v-navbar>
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
import VNavbar from '@/components/Navbar'
import VTopbar from '@/components/cards/Topbar'
import InformationWeaver from '@/components/cards/InformationWeaver'
import EnergyWeaver from '@/components/cards/EnergyWeaver'
import LocationWeaver from '@/components/cards/LocationWeaver'

export default {
  name: 'dashboard',
  components: {
    VNavbar,
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
