// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'
//
// Vue.config.productionTip = false
//
// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import 'mint-ui/lib/style.css'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueTouch from 'vue-touch'
import _glob from './components/methodCommon.vue'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(MintUI)
Vue.use(ElementUI)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.prototype.glob = _glob
// 创建高德地图
let createMap = () => {
  const promise = new Promise(function (resolve, reject) {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://webapi.amap.com/maps?v=1.3&key=1f648c12a2709a14b0e79551fdc5f791'   // 高德地图
    document.body.appendChild(script)
    if (script.nodeName === 'SCRIPT') {
      resolve()
    } else {
      reject(new Error('Could not script image at ' + script.src))
    }
  })
  return promise
}
createMap().then(function () {
  console.log('读取高德地图成功')
  // 加載當前的ip定位
}).catch(function (error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error)
})
// ………………………………………………………………
// 创建百度地图
const routes = [{
  path: '/',
  component: function (resolve) {
    require(['./views/home.vue'], resolve)
  }
}, {
  path: '/index',
  component: function (resolve) {
    require(['./views/index.vue'], resolve)
  }
}, {
  path: '/city',
  component: function (resolve) {
    require(['./views/city.vue'], resolve)
  }
}, {
  path: '/cityMint',
  component: function (resolve) {
    require(['./views/cityMint.vue'], resolve)
  }
}, {
  path: '/mapBai',
  component: function (resolve) {
    require('./assets/scss/mapBai.scss')
    require(['./views/mapBai.vue'], resolve)
  }
}, {
  path: '/map',
  component: function (resolve) {
    require(['./views/map.vue'], resolve)
  }
}, {
  path: '/vcharts',
  component: function (resolve) {
    require(['./views/vcharts.vue'], resolve)
  }
}, {
  path: '/uploadImg',
  component: function (resolve) {
    require(['./views/uploadImg.vue'], resolve)
  }
}, {
  path: '/upload',
  component: function (resolve) {
    require(['./views/upload.vue'], resolve)
  }
}, {
  path: '/touch',
  component: function (resolve) {
    require(['./views/touch.vue'], resolve)
  }
}
]
const router = new VueRouter({
  routes
})
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
