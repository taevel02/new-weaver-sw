import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'normalize.css';
import ElementUI from 'element-ui';
import locate from 'element-ui/lib/locale/lang/ko';
import 'element-theme-chalk';
import VueFire from 'vuefire';
import * as VueGoogleMaps from 'vue2-google-maps';

import './api/firebase';

Vue.use(ElementUI, { locate });
Vue.use(VueFire);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBXFRmI5-gc1FqM5woq8idSR1JziR-iwYk',
    libraries: 'places'
  }
});

Vue.config.productionTip = false;

let EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $eventBus: {
    get: function () {
      return EventBus;
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
