import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faSearch,
    faChevronUp,
    faPlusCircle,
    faList,
    faPlus,
    faEdit,
    faUser,
    faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import {
    faFacebookF,
    faInstagram,
    faTwitter,
    faYoutube,
    faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

//import { fas } from '@fortawesome/free-brands-svg-icons'
//import { fas } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import vuetify from "./plugins/vuetify";

library.add(faSearch);
library.add(faChevronUp);
library.add(faFacebookF);
library.add(faList);
library.add(faPlus);
library.add(faEdit);
library.add(faUser);
library.add(faBars);
library.add(faTimesCircle);
library.add(faInstagram);
library.add(faTwitter);
library.add(faYoutube);
library.add(faLinkedinIn);
library.add(faPlusCircle);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

import interceptorsSetup from "./helpers/interceptors";

interceptorsSetup();

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
