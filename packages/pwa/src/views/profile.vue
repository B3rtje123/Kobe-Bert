<template>
    <button @click="editActive = !editActive">
        <p>Edit</p>
    </button>

    <button @click="logoutUser">
        {{ $t('Logout') }}
    </button>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import {ref} from 'vue'

    import useFirebase from '@/composables/useFirebase'
    import { SUPPORTED_LOCALES } from '@/bootstrap/i18n'
    import useLanguage from '@/composables/useLanguage'
    import { useI18n } from 'vue-i18n'

    const { firebaseUser, logout } = useFirebase()
    const { replace } = useRouter()
    const { locale } = useI18n()
    const editActive = ref(false)


    firebaseUser.value?.getIdToken().then(token => {
        console.log(`{"Authorization": "Bearer ${token}"}`)
        console.log(firebaseUser)
    })

    const logoutUser = () => {
        logout().then(() => {
            replace({path: '/'})
        })
    }

</script>