<script lang="ts">
import { provide } from "vue"
import { RouterLink, RouterView } from "vue-router"
import { DefaultApolloClient } from "@vue/apollo-composable"
import useGraphql from "./composables/useGraphql"

import AppFooter from "./components/generic/AppFooter.vue"
import AppHeader from "./components/generic/AppHeader.vue"

export default {
  components: {
    AppFooter,
    AppHeader,
  },

  setup() {
    const { apolloClient } = useGraphql()

    provide(DefaultApolloClient, apolloClient)

    return {}
  },
}
</script>

<template>
  <RouterView />
</template>
