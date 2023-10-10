<script lang="ts">
import { provide } from "vue"
import { RouterLink, RouterView } from "vue-router"
import { DefaultApolloClient } from "@vue/apollo-composable"
import useGraphql from "./composables/useGraphql"

import AppFooter from "./components/generic/AppFooter.vue"
import AppHeader from "./components/generic/AppHeader.vue"

import useLanguage from "./composables/useLanguage"
import { useI18n } from "vue-i18n"

export default {
  components: {
    AppFooter,
    AppHeader,
  },

  setup() {
    const { apolloClient } = useGraphql()
    const { setLocale } = useLanguage()
    const { locale } = useI18n()

    provide(DefaultApolloClient, apolloClient)
    setLocale(locale.value)

    return {
      locale,
    }
  },
}
</script>

<template>
  <div>
    <RouterView />
    {{ locale }}
    {{ $t("hallo") }}
  </div>
</template>
