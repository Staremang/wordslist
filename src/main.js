import Vue from 'vue';
import VueNestable from 'vue-nestable';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueNestable);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
