<template>
  <div class="add">
    <el-dialog
      title="Add Weaver"
      :visible.sync="addWeaverDialog"
      width="50%"
      :before-close="handleClose">
      <span>Create 'Add Weaver Form'</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addWeaverDialog = false">Cancel</el-button>
        <el-button type="primary" @click="addWeaverDialog = false">Add</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'add',
  data() {
    return {
      addWeaverDialog: false
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
