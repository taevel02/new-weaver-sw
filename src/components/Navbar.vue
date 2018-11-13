<template>
  <div>
    <el-row class="tac">
      <el-col>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo side-navbar"
          background-color="#202124"
          text-color="#909399"
          active-text-color="#909399">
          <div class="title">
            <!-- <img src="" alt="logo"> -->
            <span>WEAVER</span>
          </div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>Weavers List</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="weaver in weaversRef"
                :key="weaver"
                @click="sender(weaver)">
                {{ weaver.name }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <div
            class="el-menu-item item"
            index="2"
            @click="addWeaverDialog = true">
            <i class="el-icon-circle-plus"></i>
            <span>Add Weaver</span>
          </div>
          <div
            class="el-menu-item item"
            index="3"
            @click="removeWeaverDialog = true">
            <i class="el-icon-remove"></i>
            <span>Remove Weaver</span>
          </div>
          <!-- <div class="el-menu-item item" index="4" @click="settingWeaverDialog = true">
            <i class="el-icon-setting"></i>
            <span>Setting Weaver</span>
          </div> -->
        </el-menu>
      </el-col>
    </el-row>

    <el-dialog
      title="Add Weaver"
      :visible.sync="addWeaverDialog"
      width="40%">
      <el-form :model="form">
        <el-form-item
          label="Name"
          :label-width="formLabelVisible">
          <el-input
            v-model="newWeaver.name"
            placeholder="Please write down your Weaver name.."></el-input>
        </el-form-item>
        <!-- <el-form-item
          label="Energy"
          :label-width="formLabelVisible">
          <el-input
            v-model="newWeaver.energy"
            placeholder="Use the 'Tools > Get Energy'"></el-input>
        </el-form-item>
        <el-form-item
          label="Location"
          :label-width="formLabelVisible">
          <el-input
            v-model="newWeaver.location"
            placeholder="Use the 'Tools > Get GPS'"></el-input>
        </el-form-item>
        <el-form-item
          label="Coordinates"
          :label-width="formLabelVisible">
          <el-input
            v-model="newWeaver.coordinates"
            placeholder="Use the 'Tools > Get GPS'"></el-input>
        </el-form-item>
        <el-form-item label="Tools">
          <el-button @click="getGps">Get GPS</el-button>
          <el-button @click="getEnergy">Get Energy</el-button>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addWeaverDialog = false">Cancel</el-button>
        <el-button type="primary" @click="addWeaverHandler">Add</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="Remove Weaver"
      :visible.sync="removeWeaverDialog"
      width="40%">
      <div
        class="weaverList"
        v-for="weaver in weaversRef"
        :key="weaver">
        <span class="list-item">{{ weaver.name }}</span>
        &nbsp;<i class="fa fa-trash list-item-icon" @click="removeWeaverHandler(weaver)"></i>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button @click="removeWeaverDialog = false">Close</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import { db } from '@/api/firebase.js'

export default {
  name: 'navbar',
  firebase: {
    weaversRef: {
      source: db.ref('weavers'),
      cancelCallback (e) {
        console.error(e)
      }
    }
  },
  data () {
    return {
      addWeaverDialog: false,
      removeWeaverDialog: false,

      newWeaver: {
        camPose: 0,
        compass: '',
        coordinates: '',
        energy: '',
        isCapsule: false,
        isCapsuleCycle: 500,
        isStatus: false,
        location: '',
        motor_L: false,
        motor_R: false,
        name: ''
      },

      nowWeaver: ''
    }
  },
  created () {
    this.$eventBus.$on('nowWeaver', this.onReceive)
  },
  methods: {
    sender (weaver) {
      this.nowWeaver = weaver['.key']
      this.$eventBus.$emit('nowWeaver', this.nowWeaver)
    },
    onReceive (input) {
      this.nowWeaver = input
    },
    addWeaverHandler () {
      if (this.newWeaver.name == '') {
        toastr.warning(`There are items you didn't enter`)
      } else {
        this.$firebaseRefs.weaversRef.push(this.newWeaver)
        this.newWeaver.name = ''
        this.addWeaverDialog = false
        toastr.success('New Weaver added successfully.')
      }
    },
    removeWeaverHandler (weaver) {
      this.$confirm('This will remove Weaver. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
      }).then(() => {
        this.$firebaseRefs.weaversRef.child(weaver['.key']).remove()
        toastr.success('Weaver removed successfully.')
      }).catch(() => {
        toastr.info('Remove canceled.')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.side-navbar {
  height: 100vh;

  .title {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 30px;
    color: #fff;
  }

  .activeText {
    color: #00C853;
  }
}

.item {
  color: #909399;

  &:focus {
    background-color: rgb(26, 26, 29);
  }

  &:hover {
    background-color: rgb(26, 26, 29);
  }
}

.weaverList {
  font-size: 1.2em;
  border-bottom: 1px solid gray;
  padding-top: 12px;
  padding-bottom: 12px;

  .list-item-icon {
    cursor: pointer;
    float: right;
    font-size: 1.3em;
  }
}
</style>
