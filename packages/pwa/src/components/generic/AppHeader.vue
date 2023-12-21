<template>
    <nav class="z-50 fixed w-full flex bg-BgBlack text-MainWhite py-3.5 px-6 shadow-lg lg:flex justify-between items-center">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-2 cursor-pointer">
            <svg class="h-5 w-5 text-MainWhite" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
            <span class="text-xl font-extrabold text-MainWhite">Themepark</span>
        </RouterLink>

        <!-- HamburgerMenu Symbol (animated) -->
        <button @click="showMobileMenu = !showMobileMenu" class="relative w-10 h-10 cursor-pointer text-4xl
        lg:hidden">
            <span class="sr-only">Open main menu</span>
            <div class="block absolute left-1/2 top-1/2 w-5 transform -translate-x-1/2 -translate-y-1/2">
                <span aria-hidden="true" class="block absolute h-0.75 w-5 bg-current transform transition duration-500 ease-in-out" :class="{'rotate-45': showMobileMenu,' -translate-y-1.5': !showMobileMenu }"></span>
                <span aria-hidden="true" class="block absolute h-0.75 w-5 bg-current transform transition duration-500 ease-in-out" :class="{'opacity-0': showMobileMenu } "></span>
                <span aria-hidden="true" class="block absolute h-0.75 w-5 bg-current transform transition duration-500 ease-in-out" :class="{'-rotate-45': showMobileMenu, ' translate-y-1.5': !showMobileMenu}"></span>
            </div>
        </button>

        <!-- Navigation titles -->
        <div class="px-6 pb-10 absolute bg-BgBlack w-full top-14 duration-700 ease-in-out min-h-screen text-right text-2xl
        lg:flex lg:items-center lg:px-0 lg:pb-0 lg:static lg:w-auto lg:min-h-full lg:text-lg"
        :class="[showMobileMenu ? 'left-0 ' : 'left-[-100%]']">

            <RouterLink v-for="link in links" :to="link.link" @click="showMobileMenu = !showMobileMenu"
            class="relative group 
            hover:text-sky-600
            focus:outline-none focus:text-sky-600
            lg:mx-4 lg:my-0">
                <div class="my-6 lg:my-0">
                    <p>{{ link.name }}</p>
                    <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-600 transition-all ease-in-out duration-500 group-hover:w-full group-focus:w-full group-active:w-full"
                    :class="{'w-full':link.state}"></span>
                </div>
                
            </RouterLink>

            <Button @click="AccButton" class="font-bold lg:hidden">
                {{ firebaseUser ? "Account" : "Login" }}
            </Button>
        </div>

        <!-- Account / Login button -->
        <Button @click="AccButton" class="hidden lg:flex">
            {{ firebaseUser ? "Account" : "Login" }} 
        </Button>
    </nav>
</template>

<script lang="ts">
    import { ref } from 'vue'
    import useFirebase from '@/composables/useFirebase'
    import { useRouter } from 'vue-router'
    import Button from './CtaButton.vue'

    export default{
        components:{
            Button
        },
        setup(){

            const { firebaseUser } = useFirebase()
            const { replace } = useRouter()

            const showMobileMenu = ref(false)
            const links = ref([
                {name: "Ontdek het park", link : "/", state: false},
                {name: "Attracties", link: "/attractie", state: false},
                {name: "Restaurants", link: "/restaurant", state: false},
                {name: "FAQ", link: "/FAQ", state: false},
                {name: "Tickets", link: "/ticket", state: false},
            ])
            
            
            const AccButton = () => {
                firebaseUser.value != null ? replace('/profile') : replace('/auth/login')
                showMobileMenu.value = !showMobileMenu
            }

            return{
                links,
                showMobileMenu,
                AccButton,
                firebaseUser,
            }
        }
    }
</script>
