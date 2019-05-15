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
      component: Issues
    },
    {
      path: '/lyrics',
      name: 'lyrics',
      component: Lyrics
    },
  ]
})
