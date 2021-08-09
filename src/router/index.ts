import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home/home.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About/about.vue"),
  },
]
export default createRouter({
  history: createWebHistory(),
  routes,
})