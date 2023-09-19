import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //general
    {
      path: "/",
      name: "home",
      component: () => import("../views/home.vue"),
    },
    //client
    {
      path: "/ticket",
      name: "ticket",
      component: () => import("../views/client/ticket.vue"),
    },
    {
      path: "/helpdesk",
      name: "helpdesk",
      component: () => import("../views/client/helpdesk.vue"),
    },
    {
      path: "/FAQ",
      name: "FAQ",
      component: () => import("../views/client/FAQ.vue"),
    },
    {
      path: "/bestelling",
      name: "bestelling",
      component: () => import("../views/client/bestelling.vue"),
    },
    //admin
    {
      path: "/attractie",
      name: "attractie",
      component: () => import("../views/admin/attractie.vue"),
    },
    {
      path: "/personeel",
      name: "personeel",
      component: () => import("../views/admin/personeel.vue"),
    },
    {
      path: "/restaurant",
      name: "restaurant",
      component: () => import("../views/admin/restaurant.vue"),
    },
    {
      path: "/shop",
      name: "shop",
      component: () => import("../views/admin/shop.vue"),
    },
    //authentification
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/auth/register.vue"),
    },
    {
      path: "/forgot-password",
      name: "forgotPassword",
      component: () => import("../views/auth/forgotPassword.vue"),
    },
    //404
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/404Page.vue"),
    },
  ],
})

export default router
