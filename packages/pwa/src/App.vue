<script lang="ts">
import { provide } from "vue"
import { RouterLink, RouterView } from "vue-router"
import { DefaultApolloClient } from "@vue/apollo-composable"
import useGraphql from "./composables/useGraphql"

import AppFooter from "./components/generic/AppFooter.vue"
import AppHeader from "./components/generic/AppHeader.vue"

import useLanguage from "./composables/useLanguage"

export default {
  components: {
    AppFooter,
    AppHeader,
  },

  setup() {
    const { apolloClient } = useGraphql()
    const { locale } = useLanguage()

    provide(DefaultApolloClient, apolloClient)

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
