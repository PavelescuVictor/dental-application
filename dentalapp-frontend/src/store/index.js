import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user.js";
import doctor from "./modules/doctor.js";
import patient from "./modules/patient.js";
import order from "./modules/order.js";
import orderColors from "./modules/orderColors.js";
import orderTypes from "./modules/orderTypes.js";
import orderStatus from "./modules/orderStatus.js";
import orderTypeEntry from "./modules/orderTypeEntry.js";
import navbar from "./modules/navbar.js";
import scrollTop from "./modules/scrollTop.js";
import alert from "./modules/alert.js";
import confirmation from "./modules/confirmation.js";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        doctor,
        patient,
        order,
        orderColors,
        orderTypes,
        orderStatus,
        orderTypeEntry,
        navbar,
        scrollTop,
        alert,
        confirmation,
    },
});
