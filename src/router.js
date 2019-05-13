import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Issues from './views/Issues.vue'
import Lyrics from './views/Lyrics.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/issues',
      name: 'issues',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Issues
    },
    {
      path: '/lyrics',
      name: 'lyrics',
      component: Lyrics
    },
  ]
})
