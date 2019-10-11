import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import router from './routes'
import store from './Store/store'
import Vuelidate from 'vuelidate'
import wysiwyg from 'vue-wysiwyg'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { MdCard, MdButton, MdDialog, MdContent, MdTable, MdDialogConfirm } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

import Button from './components/Reusable/button.vue';

Vue.component('app-button', Button);

/* MATERIAL */
Vue.use(MdCard)
Vue.use(MdButton)
Vue.use(MdDialog)
Vue.use(MdContent)
Vue.use(MdTable)
Vue.use(MdDialogConfirm)

/* RESOURCE */
Vue.use(VueResource)
Vue.use(BootstrapVue)

/* MISC */
Vue.use(Vuelidate)
Vue.use(wysiwyg,{})

/* GET DATABASE */
Vue.http.options.root='https://mobilelegends-c5e60.firebaseio.com/'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
