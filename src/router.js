import Vue from 'vue';
import Router from 'vue-router';
import store from './store'

Vue.use(Router)
//登陆拦截函数
const loginIntercept = (to, from, next) => {
  if (store.state.userInfo == null) {
    next("/")
    alert(`请登陆`);
  } else {
    next()
  }
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: () => import('@/views/Home')
    },
    {
      path: '/article/:articleId',
      name: 'article',
      component: () => import('@/views/Article')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/User'),
      beforeEnter: loginIntercept
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('@/views/Publish'),
      beforeEnter:loginIntercept
    },
    {
      path: "/404",
      component: () => import('@/views/404')
    },
    // 404 重定向
    {
      path: "*",
      redirect: "/404"
    }
  ]
})


export default router;