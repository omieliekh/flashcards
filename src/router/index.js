import Vue from 'vue'
import Router from 'vue-router'

import CardsList from '@/components/CardsList'
import Slideshow from '@/components/Slideshow'
import Images from '@/components/Images'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/cards-list',
      name: 'CardsList',
      component: CardsList
    },
    {
      path: '/slideshow/:id',
      name: 'Slideshow',
      component: Slideshow
    },
    {
      path: '/images',
      name: 'Images',
      component: Images
    }
  ]
})
