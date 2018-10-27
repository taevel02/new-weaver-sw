<template>
  <div class="remove">
    <el-dialog
      title="Remove Weaver"
      :visible.sync="removeWeaverDialog"
      width="50%"
      :before-close="handleClose">
      <span>Create 'Remove Weaver Form'</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="removeWeaverDialog = false">Cancel</el-button>
        <el-button type="primary" @click="removeWeaverDialog = false">Remove</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'remove',
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
