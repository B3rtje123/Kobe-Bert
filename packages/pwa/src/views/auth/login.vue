<template>
  <h1>
    {{ $t("account.welcome", { user: firebaseUser?.email }) }}
  </h1>
  <h2>
    {{ $t("account.settings") }}
  </h2>

  <select name="language" id="language" @change="setLanguage" :value="locale">
    <option v-for="(value, key) in SUPPORTED_LOCALES" :value="key">
      {{ value }}
    </option>
  </select>

  <form @submit.prevent="handleLogin">
    {{ firebaseUser }}
    <div class="container">
      <label for="uname"><b>email</b></label>
      <input
        type="email"
        placeholder="Enter email"
        name="email"
        v-model="loginCredentials.email"
        required
      />

      <label for="psw"><b>Password</b></label>
      <input
        type="password"
        placeholder="Enter Password"
        name="psw"
        v-model="loginCredentials.password"
        required
      />

      <button type="submit">Login</button>
    </div>

    <div class="container" style="background-color: #f1f1f1">
      <button type="button" class="cancelbtn">Cancel</button>
      <span class="psw">Forgot <a href="#">password?</a></span>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import useFirebase from "@/composables/useFirebase"
import { SUPPORTED_LOCALES } from "@/bootstrap/i18n"
import useLanguage from "@/composables/useLanguage"
import { useI18n } from "vue-i18n"

const { setLocale } = useLanguage()
const { locale } = useI18n()

//Composables
const { login, firebaseUser } = useFirebase()

//logic

const setLanguage = (event: Event) => {
  const target = event.target as HTMLSelectElement
  setLocale(target.value)
}

const loginCredentials = ref({
  email: "kobe.despeghel@student.howest.be",
  password: "",
})

const handleLogin = () => {
  login(loginCredentials.value.email, loginCredentials.value.password)
}
</script>
