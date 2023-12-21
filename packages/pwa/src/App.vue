<script lang="ts">
import { computed, provide } from "vue"
import { RouterLink, RouterView } from "vue-router"
import { DefaultApolloClient, useQuery } from "@vue/apollo-composable"
import useGraphql from "./composables/useGraphql"

import AppFooter from "./components/generic/AppFooter.vue"
import AppHeader from "./components/generic/AppHeader.vue"

import useLanguage from "./composables/useLanguage"
import { useI18n } from "vue-i18n"
import useCustomUser from './composables/useCustomUser'
import { SUPPORTED_LOCALES } from "./bootstrap/i18n"
import { GET_USER_BY_UID } from '@/graphql/user.query'
import useFirebase from "./composables/useFirebase"

export default {
  components: {
    AppFooter,
    AppHeader,
  },

  setup() {
    const { apolloClient } = useGraphql()
    const { setLocale } = useLanguage()
    const { locale } = useI18n()
    const { customUser } = useCustomUser()
    const { firebaseUser } = useFirebase()

    const { result } = useQuery(GET_USER_BY_UID, {uid: firebaseUser.value?.uid})
    const userResult = computed(() => result.value)

    provide(DefaultApolloClient, apolloClient)

    if(userResult.value?.getUserByUid.locale){
      setLocale(userResult.value?.getUserByUid.locale)
    }else{
      setLocale(navigator.languages.find(locale => Object.keys(SUPPORTED_LOCALES).includes(locale),) ?? locale.value,)
    }

    return {}
  },
}
</script>

<template>
  <div class="font-poppins bg-BgBlack text-MainWhite min-h-screen">
    <AppHeader />
    <div class="pt-16">
      <RouterView />
    </div>
  </div>
</template>
