<template>
  <div class="information">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">Information</span>
      </div>
      <div class="text-container">
        <div class="location">
          <div class="subtitle">Location : </div>
          <div class="item">{{ weaverLocation }}</div>
        </div>
        <div class="space"></div>
        <div class="Coordinate">
          <div class="subtitle">Coordinate : </div>
          <div class="item">{{ weaverCoordinates }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { db } from '@/api/firebase.js'

export default {
  name: 'information',
  data () {
    return {
      weaverKey: '',
      weaverCoordinates: '',
      weaverLocation: '',
    }
  },
  created () {
    this.$eventBus.$on('nowWeaver', this.onReceive)
  },
  methods : {
    onReceive (input) {
      this.weaverKey = input
      let weaverRef = db.ref('weavers/' + this.weaverKey)
      setInterval(() => {
        weaverRef.on('value', (snapshot) => {
          this.weaverCoordinates = snapshot.val().coordinates
          this.weaverLocation = snapshot.val().location
        })
      }, 1000)
    }
  }
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

  .item {
    margin-top: 0.5em;
    font-size: 1.4rem;
    font-weight: 700;
  }
}
</style>
