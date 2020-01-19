import Vue from 'vue';
import { AppContainer } from './components/containers/app';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(AppContainer),
}).$mount('#app');
