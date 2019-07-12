import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['../components/ElementLogin'], resolve)
    },
    {
      path: '/index',
      name: 'Index',
      component: resolve => require(['../components/ElementIndex'], resolve)
    },
    {
      path: '/list',
      name: 'List',
      component: resolve => require(['../components/List'], resolve)
    }
  ]
})
