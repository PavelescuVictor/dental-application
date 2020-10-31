import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Profile from "../views/Profile.vue";
import Home from "../views/Home.vue";
import Patients from "../views/Patients.vue";
import Doctors from "../views/Doctors.vue";
import Orders from "../views/Orders.vue";
import AddPatient from "../views/AddPatient.vue";
import AddDoctor from "../views/AddDoctor.vue";
import AddProfile from "../views/AddProfile.vue";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            guest: true,
            login: true,
        },
        /*
        component: () =>
            import( webpackChunkName: "login"  "../views/Login.vue"),
        */
    },
    {
        path: "/logout",
        name: "logout",
        component: Logout,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/profile",
        name: "profile",
        component: Profile,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/profile/add_profile",
        name: "addProfile",
        component: AddProfile,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/home",
        name: "home",
        component: Home,
        meta: {
            guest: true,
        },
    },
    {
        path: "/patients",
        name: "patients",
        component: Patients,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/doctors",
        name: "doctors",
        component: Doctors,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/orders",
        name: "orders",
        component: Orders,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/patients/add_patient",
        name: "addPatient",
        component: AddPatient,
        meta: {
            requiresAuth: true,
            isAdmin: true,
        },
    },
    {
        path: "/doctors/add_doctor",
        name: "addDoctor",
        component: AddDoctor,
        meta: {
            requiresAuth: true,
            isAdmin: true,
        },
    },
    {
        path: "/admin",
        name: "admin",
        meta: {
            requiresAuth: true,
            isAdmin: true,
        },
    },
];

const router = new VueRouter({
    routes,
});

// Handle ruquests to the routes based on the meta specification

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            next({ name: "login" });
        } else {
            if (to.matched.some((record) => record.meta.is_admin)) {
                if (store.getters.user.is_admin == 1) {
                    next();
                } else {
                    next();
                }
            } else {
                next();
            }
        }
    } else if (to.matched.some((record) => record.meta.guest)) {
        if (to.path == "/login") {
            if (store.getters.isLoggedIn) {
                next({ name: "home" });
            } else {
                next();
            }
        } else {
            if (!store.getters.isLoggedIn) {
                next();
            } else {
                next();
            }
        }
    } else {
        next();
    }
});

export default router;
