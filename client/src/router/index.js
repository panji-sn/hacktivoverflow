import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Question from '../views/Question.vue'
import Login from '../views/Login'
import Register from '../views/Register'
import DetailQuestion from '../views/DetailQuestion'
import CreateQuestion from '../views/CreateQuestion'
import WatchTag from '../views/WatchTag'
import MyQuestion from '../views/MyQuestion'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/myQuestion',
      name: 'myQuestion',
      component: MyQuestion
    },
    {
      path: '/createQuestion',
      name: 'createQuestion',
      component: CreateQuestion
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tag/:tag',
      name: 'tag',
      component: WatchTag
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/question/:id',
      name: 'detailquestion',
      component: DetailQuestion
    },
    {
      path: '/question',
      name: 'question',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Question
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') && (to.name === 'login' || to.name === 'register' || to.name === 'home')) {
    next('/question')
  } else if (to.name === 'login' || to.name === 'register' || to.name === 'home') {
    next()
  } else if (localStorage.getItem('token')) {
    next()
  } else if (!localStorage.getItem('token')) {
    next('/login')
  } else {
    next('/')
  }
})

export default router
