<template>
  <div class="topbar">
    <el-card class="box-card">
      <div class="text-container">
        <div class="weaver-name">Name: {{ weaver.name }}</div>
        <div class="weaver-setting"><i class="el-icon-setting" @click="settingWeaverDialog = true"></i></div>
      </div>
    </el-card>

    <el-dialog
      title="Setting Weaver"
      :visible.sync="settingWeaverDialog"
      width="40%">
      <span>Create 'Setting Weaver Form'</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="settingWeaverDialog = false">Cancel</el-button>
        <el-button type="primary" @click="settingWeaverHandler">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import toastr from 'toastr'
import 'toastr/build/toastr.css'

export default {
  name: 'topbar',
  data () {
    return {
      settingWeaverDialog: false,

      weaver: {
        name: '',
        isCapsule: false,
        isCapsuleCycle: 500,
        isStatus: false
      }
    }
  },
  created () {
    this.$eventBus.$on('nowWeaver', this.onReceive)
  },
  methods: {
    onReceive (input) {
      this.weaver = input
      console.log(this.weaver.name)
      console.log(this.weaver.isCapsule)
      console.log(this.weaver.isCapsuleCycle)
      console.log(this.weaver.isStatus)
    },
    settingWeaverHandler () {
      toastr.info('test')
    },
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
  }
}

i {
  cursor: pointer;
}
</style>
