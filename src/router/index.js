import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/',
    redirect:'/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/pacienti',
    name: 'pacients',
    component: () => import(/* webpackChunkName: "pacients" */ '../views/Pacients.vue'),
    meta: {
      //requiresAuth: true,
    },
  },
  {
    path: '/doctori',
    name: 'doctors',
    component: () => import(/* webpackChunkName: "doctors" */ '../views/Doctors.vue'),
    meta: {
      //requiresAuth: true,
    },
  },
  {
    path: '/lucrari',
    name: 'lucrari',
    component: () => import(/* webpackChunkName: "lucrari" */ '../views/Lucrari.vue'),
    meta: {
      //requiresAuth: true,
    },
  },
  {
    path: '/pacienti/adaugare-pacient',
    name: 'adaugare-pacient',
    component: () => import(/* webpackChunkName: "adaugare-pacient" */ '../views/AddPacient.vue'),
    meta: {
      //requiresAuth: true,
      //isAdmin: true,
    },
  },
  {
    path: '/lucrari/adaugare-lucrare',
    name: 'adaugare-lucrare',
    component: () => import(/* webpackChunkName: "adaugare-lucrare" */ '../views/AddLucrare.vue'),
    meta: {
      //requiresAuth: true,
      //isAdmin: true,
    },
  },
  {
    path: '/doctori/adaugare-doctor',
    name: 'adaugare-doctor',
    component: () => import(/* webpackChunkName: "adaugare-doctor" */ '../views/AddDoctor.vue'),
    meta: {
      //requiresAuth: true,
      //isAdmin: true,
    },
  },
]

const router = new VueRouter({
  routes
})

// Handle ruquests to the routes based on the meta specification

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('jwt') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let user = JSON.parse(localStorage.getItem('user'))
          if(to.matched.some(record => record.meta.is_admin)) {
              if(user.is_admin == 1){
                  next()
              }
              else{
                  next({ name: 'home'})
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('jwt') == null){
          next()
      }
      else{
          next({ name: 'home'})
      }
  }else {
      next()
  }
})

export default router
