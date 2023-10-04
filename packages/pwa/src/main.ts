import { createApp } from "vue"

import "@unocss/reset/tailwind.css"
import "virtual:uno.css"

import App from "./App.vue"
import router from "./bootstrap/router"

import useFirebase from "./composables/useFirebase"
import { i18n } from "./bootstrap/i18n"

const app = createApp(App)
const { restoreUser } = useFirebase()

app.use(i18n)
;(async () => {
  await restoreUser()

  app.use(router)

  app.mount("#app")
})()

// restoreUser().then(() => {
//   app.use(router)
//   app.mount("#app")
// })
