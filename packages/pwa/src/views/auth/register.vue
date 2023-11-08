<template>
    <form @submit.prevent="handleRegister" 
    class="flex mt-16 justify-center items-center">
        <div class="rounded-lg max-w-sm shadow-[0_0_60px_-25px_rgba(0,0,0,0.3)] shadow-AccentBlue p-12 bg-MainWhite">
            <div class="text-center m-8">
                <h1 class="text-3xl font-semibold">Sign up</h1>
                <h2 class="text-xs mt-1">Enter your account details below</h2>
            </div>

            <div class="mb-6">
                <label for="nickname" class="mb-4 font-medium">Username</label>
                <input 
                    type="text"
                    name="nickname"
                    id="nickname"
                    placeholder="Joey"
                    v-model="newUser.name"
                    class="block rounded-lg border-2 p-2 shadow-inner w-full"
                />
            </div>

            <div class="mb-6">
                <label for="email" class="mb-4 font-medium">Email<span :class="{'animate-pulse text-red-500 font-semibold' : !isValidEmail(newUser.email), 'text-BgBlack font-normal animate-none' : isValidEmail(newUser.email)}">*</span></label>
                <input 
                    type="text"
                    name="email"
                    id="email"
                    placeholder="example@domain.com"
                    v-model="newUser.email"
                    required
                    class="block rounded-lg border-2 p-2 shadow-inner w-full"   
                    @input=""
                />
                <p v-show="showError" class="text-red-500">{{ isValidEmail(newUser.email) ? "" : "Ongeldig e-mail adres" }}</p>
            </div>

            <div class="mb-6">
                <label for="password" class="mb-4 font-medium">Password<span :class="{'animate-pulse text-red-500 font-semibold' : !passwordLength(newUser.password), 'text-BgBlack font-normal animate-none' : passwordLength(newUser.password)}">*</span></label>
                <input 
                    type="text"
                    name="password"
                    id="password"
                    v-model="newUser.password"
                    class="block rounded-lg border-2 p-2 shadow-inner w-full"
                    @input="isStrongPassword(newUser.password), passwordLength(newUser.password)"
                    
                />
                <div class="text-sm">
                    
                    <p class="font-semibold" :class="{ 'text-green-700' : passwordLength(newUser.password), 'text-red-500' : !passwordLength(newUser.password) }">{{ passwordLength(newUser.password) ? "Je wachtwoord bevat 8 tekens" : "Moet minstens 8 tekens bevatten" }}</p>
                    <!-- <p>Make sure your password has the following:</p>
                    <ul class="">
                        <li class="list-disc">{{ checker.has_lowercase ? "Has lowercase letters" : "Has NO lowercase letters" }}</li>
                        <li class="list-disc">{{ checker.has_uppercase ? "Has uppercase letters" : "Has NO uppercase letters" }}</li>
                        <li class="list-disc">{{ checker.has_number ? "Has numbers" : "Has NO numbers" }}</li>
                        <li class="list-disc">{{ checker.has_special ? "Has special characters" : "Has NO special characters" }}</li>
                    </ul> -->
                </div>
            </div>

            <div class="">
                <button
                    type="submit"
                    class="w-full py-2 rounded-lg mb-8 font-semibold bg-AccentBlue text-MainWhite"
                >
                    Sign up
                </button>
            </div>

            <div>
                <RouterLink to="/auth/login" class="font-normal text-sm">
                    <p>Do you have an account? <span class="text-AccentBlue">Log in</span></p>
                </RouterLink>
            </div>
            
            <div class="inline-flex items-center justify-center w-full">
                <hr class="w-full h-px translate-y-0.5 my-8 bg-BgBlack border-0">
                <span class="absolute px-3 font-medium text-BgBlack -translate-x-1/2 bg-MainWhite left-1/2">or</span>
            </div>

            <div class="flex justify-center items-center">
                <button class="border border-BgBlack px-6 py-3 rounded-lg">
                    <RouterLink to="/" class="">
                        <p>Continue without logging in</p>
                    </RouterLink>
                </button>
            </div>

            
        </div>
    </form>
</template>


<script setup lang="ts">
    import { computed, ref } from 'vue'
    import { type AuthError } from 'firebase/auth'

    import useFirebase from '@/composables/useFirebase'
    import useCustomUser from '@/composables/useCustomUser'
    import { useMutation } from '@vue/apollo-composable'
    import { ADD_USER } from '@/graphql/user.mutation'
    import { useI18n } from 'vue-i18n'
    import type { CustomUser } from '@/interfaces/user.interface'
    import { Loader2 } from 'lucide-vue-next'
    import { useRouter } from 'vue-router'


    // Composables
    const { register } = useFirebase()
    const { locale } = useI18n()
    const { customUser } = useCustomUser()
    const { replace } = useRouter()

    //Logic
    const error = ref<AuthError | null>(null)
    const startValidation = ref(false)
    const showError = ref(false)
    const newUser = ref({
        name: '',
        password: '',
        email: '',
    })
    const checker = ref({
        has_number: false,
        has_lowercase: false,
        has_uppercase: false,
        has_special: false
    })

    const { mutate: addUser, loading: addUserLoading } = useMutation<CustomUser>(ADD_USER)

    const isValidEmail = (EmailParameter : string) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(EmailParameter) ? true  : false
    }

    const isStrongPassword = (PasswordParameter : string) => {
        if(/\d/.test(PasswordParameter)){
            checker.value.has_number = true
        }
        else{
            checker.value.has_number = false
        }
        if(/[a-z]/.test(PasswordParameter)){
            checker.value.has_lowercase = true
        } 
        else{
            checker.value.has_lowercase = false
        }
        if(/[A-Z]/.test(PasswordParameter)){
            checker.value.has_uppercase = true
        } 
        else{
            checker.value.has_uppercase = false
        }
        if(/[!@#\$%\^\&*\)\(+=._-]/.test(PasswordParameter)){
            checker.value.has_special = true
        }
        else{
            checker.value.has_special = false
        }
    }
    const passwordLength = (Password : string) => {
        return Password.length >= 8 ? true : false
    }

    const handleRegister = () => {
        // startValidation.value = true
        // isStrongPassword(newUser.value.password)
        if(isValidEmail(newUser.value.email) == true && passwordLength(newUser.value.password) == true){
            register(newUser.value.name, newUser.value.email, newUser.value.password)
            .then(() => {
                addUser({
                    createUserInput: {
                        name: newUser.value.name,
                        email: newUser.value.email,
                        role: "CLIENT",
                        locale: locale.value,
                    },
                }).then(result => {
                    if (!result?.data) throw new Error('Custom user creation failed')

                    customUser.value = result.data
                    console.log(newUser)
                    replace('/')
                })
            })
            .catch(err => {
                error.value = err
            })
        }
        else{
            showError.value = true
            console.log("email of password is niet goed")
        }

    }

</script>