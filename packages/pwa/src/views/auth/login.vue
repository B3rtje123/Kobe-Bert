<template>
  <form @submit.prevent="handleLogin"
  class="flex mt-16 justify-center items-center">
    <div class="rounded-lg max-w-sm shadow-[0_0_60px_-25px_rgba(0,0,0,0.3)] shadow-AccentBlue p-12 bg-MainWhite">

      <div class="text-center m-8">
        <h1 class="text-3xl font-semibold">Log in</h1>
        <h2 class="text-xs mt-1">Enter your account details below</h2>
      </div>

      <p class="text-red-500 font-medium text-center">{{ tooMany ? 'You have tried too many times.\nTry again later!' : '' }}</p>
      <p class="text-red-500 font-medium text-center">{{ wrongLogin ? 'Email or password is wrong!' : '' }}</p>

      <div class="mb-6">
        <label for="email" class="mb-4 font-medium">Email</label>
        <input 
            type="text"
            name="email"
            id="email"
            placeholder="example@domain.com"
            v-model="loginCredentials.email"
            required
            autocomplete="off"
            class="block rounded-lg border-2 p-2 shadow-inner shadow-gray-400 w-full transition-colors ease-in-out duration-300
            hover:border-AccentBlue 
            focus:outline-none focus:ring-4 focus:ring-AccentBlue"   
            @input=""
        />
        <p v-show="showError" class="text-red-500">{{ isValidEmail(loginCredentials.email) ? "" : "Ongeldig e-mail adres" }}</p>
      </div>

      <div class="mb-6">
        <label for="password" class="mb-4 font-medium">Password</label>
        <input 
          type="text"
          name="password"
          id="password"
          v-model="loginCredentials.password"
          autocomplete="off"
          class="block rounded-lg border-2 p-2 shadow-inner shadow-gray-400 w-full transition-colors ease-in-out duration-300
            hover:border-AccentBlue 
            focus:outline-none focus:ring-4 focus:ring-AccentBlue "                    
        />
      </div>

      <div class="">
        <button
            type="submit"
            class="w-full py-2 border border-hidden rounded-lg mb-8 font-semibold bg-AccentBlue text-MainWhite transition ease-in-out duration-300
            hover:bg-BgBlack/25 hover:text-BgBlack 
            focus:outline-none focus:ring-4 focus:ring-AccentBlue focus:bg-[#1B8ACC]"
        >
            Log in
        </button>
      </div>

      <div>
        <RouterLink to="/auth/register" class="font-normal text-sm 
        focus:outline-AccentBlue ">
          <p class="p-1">Don't have an account yet? <span class="text-AccentBlue">Sign up</span></p>
        </RouterLink>
      </div>

      <div class="inline-flex items-center justify-center w-full">
        <hr class="w-full h-px translate-y-0.5 my-8 bg-BgBlack border-0">
        <span class="absolute px-3 font-medium text-BgBlack -translate-x-1/2 bg-MainWhite left-1/2">or</span>
      </div>

      <RouterLink to="/" class="flex border border-BgBlack justify-center py-3 rounded-lg w-full
      hover:font-semibold 
      focus:outline-none focus:ring-4 focus:ring-AccentBlue focus:border-AccentBlue focus:font-medium">
          <p>Continue without logging in</p>
      </RouterLink>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { AuthErrorCodes, type AuthError } from 'firebase/auth'

  import useFirebase from '@/composables/useFirebase'
  import { useRouter } from 'vue-router'

  //composables
  const { login, firebaseUser } = useFirebase()
  const { replace } = useRouter()

  //logic
  const loginCredentials = ref({
    email: '',
    password:'',
  })
  const error = ref<AuthError | null>(null)
  const showError = ref(false)
  const tooMany = ref(false)
  const wrongLogin = ref(false)

  const isValidEmail = (EmailParameter : string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(EmailParameter) ? true  : false
  }

  const handleLogin = () => {
    tooMany.value = false
    wrongLogin.value = false
    if(isValidEmail(loginCredentials.value.email) == true){
      login(loginCredentials.value.email, loginCredentials.value.password)
      .then(() => {
        replace('/')
      })
      .catch((err: AuthError) => {
        error.value = err
        console.log(error.value.code)
        if(error.value.code == 'auth/invalid-login-credentials'){
          wrongLogin.value = true
        }
        if(error.value.code == 'auth/too-many-requests'){
          tooMany.value = true
        }
      })
    }
    else{
      
      showError.value = true
      console.log("email of password is niet goed")
    }

  }
</script>
