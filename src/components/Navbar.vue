<template>
  <nav class="navbar">
    <div class="navbar_name">
      <img
        src="@/assets/images/logo.png"
        @click="goHome"
        class="navbar_logo">
    </div>
    <div class="navbar_menu">
      <router-link class="navbar_menu-item" to="/dashboard">Dashboard</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  background-color: transparent;
  padding: 60px 180px;
}

.navbar_logo {
  cursor: pointer;
  height: 40px;
}

.navbar_menu {
  display: flex;
  margin-left: auto;
}

.navbar_menu-item {
  margin-left: 70px;
  font-size: 20px;
  cursor: pointer;
  text-decoration: none;
  color: #000;
}
</style>