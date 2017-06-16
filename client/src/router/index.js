import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Sell from '@/components/Sell'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/houses/new',
      name: 'Sell',
      component: Sell
    }
  ]
})
