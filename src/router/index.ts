import Vue from 'vue'
import Router from 'vue-router'

import login from '../views/login'
 import okay from '../views/okay'
import demo from '../views/demo'

Vue.use(Router)


 const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'demo'
    }
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo,
      meta:{title: 'demo'},
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      // children: [
      //   {
      //     path: '/',
      //     name: 'demo',
      //     component: demo
      //   },
      //   {
      //     path: 'demo',
      //     name: 'demo',
      //     component: demo
      //   } 
      // ],
      meta:{title: '登录'},
      /* 路由内钩子 */
      beforeEnter: function(to:any,from:any,next:any){
        if(to.meta.title){
          document.title = to.meta.title
        }else{
            document.title = '路由'
        }
        next()
    }
    },
    {
      path: '/okay',
      name: 'okay',
      /* 路由内钩子 */
      component:okay,
      meta:{title: '测试'},
      // 需要登录才能进入的页面可以增加一个meta属性
      // meta: { 
      //     requireAuth: false
      //   },
      //    component: (resolve) => {
      //     require(['../views/okay'], resolve)
      //  }
      
    }
  ],
     // mode:'history'   //去#号 需要服务器支持
      mode:'hash'   //默认
})

//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
     if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
      if (localStorage.getItem('username')) {// 判断是否登录
        next()
      } else {// 没登录则跳转到登录界面
         next({
           path: '/login',
         query: {redirect: to.fullPath}
        })
     }
    } else {
      next()
    }
   })


export default router


