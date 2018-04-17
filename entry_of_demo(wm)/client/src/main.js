// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import './style/iview.css';
import './style/element-ui.css';


Vue.use(ElementUI)
Vue.use(iView);
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  // console.log(to)
  if(('/' == to.path) && ('#' == to.hash)) {
    next(false);
    return;
  }

  if (to.matched.length && ('/' != to.path)) {
    next();
  } else {
    next({path: '/enquiry', redirect: '/'})
  }
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')
