import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faChevronUp, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faTwitter, faYoutube, faLinkedinIn,} from '@fortawesome/free-brands-svg-icons'

//import { fas } from '@fortawesome/free-brands-svg-icons'
//import { fas } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import vuetify from './plugins/vuetify';

library.add(faSearch)
library.add(faChevronUp)
library.add(faFacebookF)
library.add(faInstagram)
library.add(faTwitter)
library.add(faYoutube)
library.add(faLinkedinIn)
library.add(faPlusCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
