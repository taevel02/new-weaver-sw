import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'normalize.css'
import ElementUI from 'element-ui'
import locate from 'element-ui/lib/locale/lang/ko'
import 'element-theme-chalk'
import VueFire from 'vuefire'

Vue.use(VueFire)
Vue.use(ElementUI, { locate })

Vue.config.productionTip = false

let EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $eventBus: {
    get: function () {
      return EventBus
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
