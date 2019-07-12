// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MyRouter from './router'
import ElementUI from 'element-ui'
// import {VeeValidate} from 'vee-validate'
import Axios from 'axios'
import Http from './libs/http'

Vue.use(ElementUI);
// Vue.use(VeeValidate);
Vue.use(Axios);
Vue.use(Http);

//为啥导入的时候不能用@表示src文件夹
//为啥别的工程可以再main.js中直接进行axios的全局配置

Vue.config.productionTip = false;

// 入口路由拦截
MyRouter.beforeEach((to, from, next) => {
  let login = localStorage.getItem('loginToken');
  let path = to.path;

  if (!login && path !== '/login') {
    next({path: '/login'})
  } else if (path === '/login' && login) {
    next({path: '/index'})
  }
  next()
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:MyRouter,
  components: { App },
  template: '<App/>'
});
