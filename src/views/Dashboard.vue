<template>
  <div class="dashboard">
    <information-weaver></information-weaver>
    <energy-weaver></energy-weaver>
    <location-weaver></location-weaver>
  </div>
</template>

<script>
import InformationWeaver from '../components/cards/InformationWeaver'
import EnergyWeaver from '../components/cards/EnergyWeaver'
import LocationWeaver from '../components/cards/LocationWeaver'

export default {
  name: 'dashboard',
  components: {
    InformationWeaver,
    EnergyWeaver,
    LocationWeaver
  }
}
</script>

<style lang="scss" scoped>
</style>
