import { createRouter, createWebHistory } from "vue-router"

import useFirebase from "@/composables/useFirebase"

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
      name: "attracties",
      component: () => import("../views/admin/attractie.vue"),
      // meta: { shouldBeAuthenticated: true },
    },
    {
      path: "/personeel",
      name: "personeel",
      component: () => import("../views/admin/personeel.vue"),
      meta: { shouldBeAuthenticated: true },
    },
    {
      path: "/restaurant",
      name: "restaurants",
      component: () => import("../views/admin/restaurant.vue"),
      // meta: { shouldBeAuthenticated: true },
    },
    {
      path: "/shop",
      name: "shop",
      component: () => import("../views/admin/shop.vue"),
      meta: { shouldBeAuthenticated: true },
    },
    //authentification
    {
      path: "/auth",
      component: () => import("../components/wrappers/AuthWrap.vue"),
    },
    {
      path: "/auth/login",
      name: "login",
      component: () => import("../views/auth/login.vue"),
    },
    {
      path: "/auth/register",
      name: "register",
      component: () => import("../views/auth/register.vue"),
    },
    {
      path: "/auth/forgot-password",
      name: "forgotPassword",
      component: () => import("../views/auth/forgotPassword.vue"),
    },
    {
      path: "/profile",
      name: "Account",
      component: () => import("../views/profile.vue"),
    },
    //404
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/404Page.vue"),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const { firebaseUser } = useFirebase()

  if (to.meta.shouldBeAuthenticated && !firebaseUser.value) {
    console.log("HACKER")
    next({ path: "/auth/login" })
  } else {
    next()
  }
})

export default router