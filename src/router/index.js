import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Reel from '../views/Reel.vue'
import Carousel from '../views/Carousel.vue'
import Project from '../views/Project.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
        {
          path: '/reel',
          component: Reel
        },
        {
          path: '/about',
          component: About
        },
        {
          path: '/carousel',
          component: Carousel,
          children: [
            {
              path: 'project/',
              component: Project,
            }
          ]
        },
      ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
