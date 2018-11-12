<template>
  <div class="topbar">
    <el-card class="box-card">
      <div class="text-container">
        <div class="weaver-name">{{ weaverName }}</div>
        <div class="weaver-setting"><i class="el-icon-setting" @click="settingWeaverDialogEvent"></i></div>
      </div>
    </el-card>

    <el-dialog
      title="Setting Weaver"
      :visible.sync="settingWeaverDialog"
      width="40%">
      <div class="menu">
        <span>Capsule Drop Status : &nbsp;</span>
        <el-switch v-model="weaverIsStatus"></el-switch>
      </div>
      <div class="menu">
        <span>Capsule Drop : &nbsp;</span>
        <el-button size="small" @click="weaverIsCapsuleHandler">Drop a Capsule</el-button>
      </div>
      <div class="menu">
        <span>Setting Capsule Drop Cycle : &nbsp;</span>
        <el-select size="small" v-model="weaverIsCapsuleCycle" placeholder="Select time">
          <el-option
            v-for="time in times"
            :key="time"
            :label="time.label"
            :value="time.value">
          </el-option>
        </el-select>&nbsp;
        <el-button size="small" @click="weaverIsCapsuleCycleHandler">Set</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="settingWeaverDialog = false">Close</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import { db } from '@/api/firebase.js'

export default {
  name: 'topbar',
  data () {
    return {
      settingWeaverDialog: false,

      weaverKey: '',
      weaverName: '',
      weaverIsStatus: false,
      weaverIsCapsule: false,

      times: [{
        value: 5000,
        label: '5 sec'
      }, {
        value: 600000,
        label: '10 minutes'
      }, {
        value: 900000,
        label: '15 minutes'
      }, {
        value: 1800000,
        label: '30 minutes (recommand)'
      }, {
        value: 3600000,
        label: '1 hour'
      }],
      weaverIsCapsuleCycle: ''
    }
  },
  created () {
    this.$eventBus.$on('nowWeaver', this.onReceive)
  },
  methods: {
    onReceive (input) {
      this.weaverKey = input
      let weaverRef = db.ref('weavers/' + this.weaverKey)
      weaverRef.on('value', (snapshot) => {
        this.weaverName = snapshot.val().name
        this.weaverIsStatus = snapshot.val().isStatus
        this.weaverIsCapsule = snapshot.val().issCapsule
      })
    },
    settingWeaverDialogEvent () {
      if (this.weaverKey === '') {
        toastr.error('Select the Weaver you want to set..')
      } else {
        this.settingWeaverDialog = true
      }
    },
    weaverIsCapsuleHandler () {
      let capsuleDB = db.ref('weavers/' + this.weaverKey + '/isCapsule')
      if (this.weaverIsStatus) {
        capsuleDB.set(true)
        toastr.success('Capsule dropped successfully.')
      } else {
        toastr.error('Check the Capsule Drop Status..')
      }
      setTimeout(() => {
        capsuleDB.set(false)
      }, 1500)
    },
    weaverIsCapsuleCycleHandler () {
      if (this.weaverIsStatus) {
        db.ref('weavers/' + this.weaverKey + '/isCapsuleCycle').set(this.weaverIsCapsuleCycle)
        toastr.success('The Capsule Drop Cycle has been set successfully.')
      } else {
        toastr.error('Check the Capsule Drop Status..')
      }
    }
  },
  watch: {
    weaverIsStatus () {
      db.ref('weavers/' + this.weaverKey + '/isStatus').set(this.weaverIsStatus)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/card.scss';

.box-card {
  width: 1210px;
  height: auto;

  .text-container {
    display: flex;
  }

  .weaver-name {
    flex: 1;
    font-weight: bold;
  }
}

i {
  cursor: pointer;
}

.menu {
  margin-bottom: 1em;
}
</style>
