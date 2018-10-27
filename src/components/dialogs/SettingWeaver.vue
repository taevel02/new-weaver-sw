<template>
  <div class="setting">
    <el-dialog
      title="Setting Weaver"
      :visible.sync="settingWeaverDialog"
      width="50%"
      :before-close="handleClose">
      <span>Create 'Setting Weaver Form'</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="settingWeaverDialog = false">Cancel</el-button>
        <el-button type="primary" @click="settingWeaverDialog = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'setting',
  data() {
    return {
      removeWeaverDialog: false
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
      .then(_ => {
        done()
      })
      .catch(_ => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/dialog.scss';
</style>
