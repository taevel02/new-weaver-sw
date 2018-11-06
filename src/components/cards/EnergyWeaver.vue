<template>
  <div class="energy">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">Energy</span>
      </div>
      <div class="text item">
        <div class="radialbar">
          <el-progress type="circle" :percentage="weaverEnergy" stroke-width="20"></el-progress>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { db } from '@/api/firebase.js'

export default {
  name: 'energy',
  data () {
    return {
      weaverKey: '',
      weaverEnergy: 0
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
          this.weaverEnergy = snapshot.val().energy
        })
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/card.scss';

.box-card {
  width: 470px;
  text-align: center;
}
</style>
