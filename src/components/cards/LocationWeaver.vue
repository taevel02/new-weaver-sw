<template>
  <div class="location">
    <el-card class="box-card">
      <gmap-map
        :center="center"
        :zoom="15"
        style="width: 1170px; height: 560px;">
        <gmap-marker
          :position="center"></gmap-marker>
      </gmap-map>
    </el-card>
  </div>
</template>

<script>
import { db } from '@/api/firebase.js'

export default {
  name: 'location',
  data () {
    return {
      weaverKey: '',
      weaverCoordinates: '',
      center: { lat: null, lng: null }
    }
  },
  created () {
    this.$eventBus.$on('nowWeaver', this.onReceive)
  },
  methods: {
    onReceive (input) {
      this.weaverKey = input
      let weaverRef = db.ref('weavers/' + this.weaverKey)
      setInterval(() => {
        weaverRef.on('value', (snapshot) => {
          this.weaverCoordinates = snapshot.val().coordinates
          this.initMap(this.weaverCoordinates)
        })
      }, 1000)
    },
    initMap (coordinate) {
      let latlngStr = coordinate.split(',', 2)
      this.center = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/card.scss';

.box-card {
  width: 1210px;
  height: 600px;
}
</style>
