<template>
  <section class="home">
    <v-navbar></v-navbar>
    <div class="main_msg-wrapper">
      <p class="main_msg">
        Restrain the ocean ecosystem<br>
        by curbing the phenomenon<br>
        of sea coral reef bleaching.
      </p>
    </div>
    <div class="main_illust-wrapper">
      <img
        src="@/assets/images/main_illust.png"
        class="main_illust">
    </div>
  </section>
</template>

<script>
import VNavbar from '@/components/Navbar'

export default {
  name: 'home',
  components: {
    VNavbar
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
}

.main_msg-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 300px);
  margin-left: 180px;
  overflow: auto;
}

.main_msg {
  font-size: 40px;
  margin: 30px 0;
  color: #000;
}

.main_illust {
  position: absolute;
  top: 200px; right: 150px;
  height: 600px;
  z-index: -1;
}
</style>
