import { createApp } from "vue"

import "@unocss/reset/tailwind.css"
import "virtual:uno.css"

import App from "./App.vue"
import router from "./bootstrap/router"

import useFirebase from "./composables/useFirebase"
import { i18n } from "./bootstrap/i18n"

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faFloppyDisk, faXmark, faTrash } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)
const { restoreUser } = useFirebase()

library.add(faPlus, faFloppyDisk, faXmark, faTrash)

app.use(i18n)
;(async () => {
  await restoreUser()

  app.use(router)
  app.component('font-awesome-icon', FontAwesomeIcon)
  app.mount("#app")
})()

// restoreUser().then(() => {
//   app.use(router)
//   app.mount("#app")
// })
