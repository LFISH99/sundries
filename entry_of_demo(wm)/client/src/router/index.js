import Vue from 'vue'
import Router from 'vue-router'


import Hello from '@/components/Hello'
import Enquiry from '@/page/enquiry'
import Test from '@/test'
// import Test from '@/test'

// let Test = r => require.ensure([], () => r(require('@/test')), 'test')
// const Hello = r => require.ensure([], () => r(require('../components/Hello.vue')), 'Hello')
// const Enquiry = r => require.ensure([], () => r(require('../page/enquiry.vue')), 'Log')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Enquiry,
      meta: {title: 'Hello'}
    },
    {
      path: '/enquiry',
      component: Enquiry,
      meta: {title: '询价', menu: '/enquiry'}
    },
    {
      path: '/en',
      component: Hello,
      meta: {title: '询价12', menu: '/enquiry'}
    },
    {
      path: '/test',
      component: Test,
      meta: {title: 'Test', menu: '/test'}
    }
  ]
})
