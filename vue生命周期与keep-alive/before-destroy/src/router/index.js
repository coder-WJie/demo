import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Tooltip from '../views/Tooltip.vue'
import TestTip from '../views/TestTip.vue'
import Popover from '../directive/Popover.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/tooltip",
    name: "Tooltip",
    component: Tooltip,
  },
  {
    path: "/testtip",
    name: "TestTip",
    component: TestTip,
  },
  {
    path: "/popover",
    name: "popover",
    component: Popover,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
