<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.css'
import WebFont from 'webfontloader'

export default {
  name: 'App',
  created () {
    WebFont.load({
      custom: {
        families: ['Spoqa Han Sans'],
        urls: ['//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css']
      }
    })
  }
}
</script>

<style>
#app {
  font-family: 'Spoqa Han Sans';
  /* font-size: 1rem; */
}
</style>
