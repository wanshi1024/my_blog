import Vue from 'vue';
import Router from 'vue-router';
import store from "./store";

// 这个是为了避免一个报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

//未登陆拦截函数
const loginIntercept = (to, from, next) => {
  if (Object.keys(store.state.userInfo).length == 0) {
    alert(`请登陆`);
     next("/")
  } else {
    next()
  }
}

const router = new Router({
  // mode: 'history',
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
      beforeEnter: loginIntercept
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