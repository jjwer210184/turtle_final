import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'firebase/firestore'
import { firestorePlugin } from 'vuefire'
import store from "./store.js";


Vue.use(firestorePlugin)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
})
