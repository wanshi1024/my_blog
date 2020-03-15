import Vue from 'vue';
import Router from 'vue-router';
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: () => import('@/views/Home'),
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/article/:articleId',
      name: 'article',
      component: () => import('@/views/Article'),
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/User'),
      beforeEnter: (to, from, next) => {
        if (store.state.userInfo == null) {
          next("/")
          alert(`请登陆`);
        } else {
          next()
        }
      }
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('@/views/Publish')
    }
  ]
})


export default router;