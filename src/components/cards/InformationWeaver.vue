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
        <div class="coordinate">
          <div class="subtitle">Coordinate : </div>
          <div class="item">{{ weaverCoordinates }}</div>
        </div>
        <div class="compass">
          <div class="subtitle">Compass : </div>
          <div class="item">{{ weaverCompass }}</div>
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
      weaverCompass: '',
      weaverCoordinates: '',
      weaverLocation: '',
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
          this.weaverCompass = snapshot.val().compass
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

    & > div {
      margin-right: 25px;
    }
  }

  .item {
    margin-top: 0.5em;
    font-size: 1.4rem;
    font-weight: 700;
  }
}
</style>
