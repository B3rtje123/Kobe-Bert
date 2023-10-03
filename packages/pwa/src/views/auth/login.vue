<template>
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

<script lang="ts">
import { ref } from "vue"
import useFirebase from "@/composables/useFirebase"

export default {
  setup() {
    //Composables
    const { login, firebaseUser } = useFirebase()

    //logic

    const loginCredentials = ref({
      email: "kobe.despeghel@student.howest.be",
      password: "",
    })

    const handleLogin = () => {
      login(loginCredentials.value.email, loginCredentials.value.password)
    }

    return {
      loginCredentials,
      handleLogin,
      firebaseUser,
    }
  },
}
</script>
