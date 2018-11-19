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
        <span>Capsule Drop Cycle Status : &nbsp;</span>
        <el-switch v-model="weaverIsStatusCycle"></el-switch>
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
        </el-select>&nbsp;&nbsp;
        <el-button size="small" @click="weaverIsCapsuleCycleHandler">Set</el-button>
        <el-button size="small" @click="weaverIsCapsuleCycleStopHandler">Stop</el-button>
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

let capsulecycle, check
let capsulecycleCheck = 0

export default {
  name: 'topbar',
  data () {
    return {
      settingWeaverDialog: false,

      weaverKey: '',
      weaverName: '',
      weaverIsStatus: false,
      weaverIsStatusCycle: false,
      weaverIsCapsule: 0,
      weaverIsCapsuleCycle: '',

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
      }]
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
        this.weaverIsStatusCycle = snapshot.val().isStatusCycle
        this.weaverIsCapsule = snapshot.val().isCapsule
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
        capsuleDB.set(1)
        toastr.success('Capsule dropped successfully.')
      } else {
        toastr.error('Check the Capsule Drop Status..')
      }
      setTimeout(() => {
        capsuleDB.set(0)
      }, 1500)
    },
    weaverIsCapsuleCycleHandler () {
      let capsuleDB = db.ref('weavers/' + this.weaverKey + '/isCapsule')
      if (this.weaverIsStatusCycle) {
        if (this.weaverIsCapsuleCycle) {
          capsulecycle = setInterval(() => {
            capsuleDB.set(1)
            check = setTimeout(() => {
              capsuleDB.set(0)
            }, 1500)
          }, this.weaverIsCapsuleCycle + 1500)
          toastr.success('The Capsule Drop Cycle has been set successfully.')
          capsulecycleCheck = 1
        } else {
          toastr.error('Select cycle..')
          capsulecycleCheck = 0
        }
      } else {
        toastr.error('Check the Capsule Drop Cycle Status..')
        capsulecycleCheck = 0
      }
    },
    weaverIsCapsuleCycleStopHandler () {
      if (capsulecycleCheck === 1) {
        clearInterval(capsulecycle)
        clearTimeout(check)
        // db.ref('weavers/' + this.weaverKey + '/isStatusCycle').set(false)
        db.ref('weavers/' + this.weaverKey + '/isCapsule').set(0)
        toastr.success('Capsule Drop Cycle is stop.')
        capsulecycleCheck = 0
      }
    }
  },
  watch: {
    weaverIsStatus () {
      db.ref('weavers/' + this.weaverKey + '/isStatus').set(this.weaverIsStatus)
    },
    weaverIsStatusCycle () {
      db.ref('weavers/' + this.weaverKey + '/isStatusCycle').set(this.weaverIsStatusCycle)
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
