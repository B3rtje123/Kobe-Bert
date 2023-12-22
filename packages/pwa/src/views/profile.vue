<template>
    <div v-if="firebaseUser" class="flex text-center flex-col pb-8 max-w-screen overflow-hidden">
        <div class="flex lg:flex-row flex-col justify-center items-center mt-16 gap-8">
            <img class="rounded-full lg:w-1/7 self-center" src="../components/img/coding-logo-design-template-free-vector.jpg" alt="">
            <div class="flex flex-col gap-4">
                <input 
                    type="text"
                    class="text-2xl font-medium text-left bg-transparent placeholder:text-MainWhite"
                    v-bind:readonly="!userEditActive"
                    v-bind:placeholder='userResult.getUserByUid.fullname ? userResult.getUserByUid.fullname : "No name found!"'
                    v-model="UpdatedUserInfo.name"
                />
                <!-- <p class="text-2xl font-medium text-left">{{ userResult.getUserByUid.name }}</p> -->
                <Button v-if="!userEditActive" class="text-base" @click="userEditActive = !userEditActive">
                    <p>{{ $t('account.edit') }}</p>
                </Button>
                <Button v-else class="text-base" @click="Save">
                    <p>{{ $t('account.save') }}</p>
                </Button>
                <Button class="text-base" @click="logoutUser" >
                    {{ $t('account.log.out') }}
                </Button> 
            </div> 
        </div>
        <div class="inline-flex items-center justify-center w-full">
            <hr class="w-3/4 h-px translate-y-0.5 my-8 bg-MainWhite border-0">
        </div>

        <div class="flex justify-center">
            <div class="justify-between text-left flex flex-wrap w-8/12">

                <div class="w-[45%] flex flex-col">
                    <label for="name" class="mb-2">{{ $t('account.name') }}:</label>
                    <input 
                        class="mb-6 text-MainWhite border-MainWhite/50 bg-transparent border-2 p-4 rounded-full"
                        type="text"
                        name="name"
                        id="name"
                        v-bind:readonly="!userEditActive"
                        v-bind:placeholder='userResult.getUserByUid.name ? userResult.getUserByUid.name : "No full name found!"'
                        v-model="UpdatedUserInfo.name"
                    />
                </div>

                <div class="w-[45%] flex flex-col">
                    <label for="name" class="mb-2">{{ $t('account.language.title') }}:</label>
                    <select name="language" id="language" v-model="UpdatedUserInfo.locale"
                    :disabled="!userEditActive"
                    class="mb-6 text-MainWhite border-MainWhite/50 bg-BgBlack border-2 p-4 rounded-full ease-in-out duration-200">
                        <option :value="null">{{ $t('account.language.null') }}</option>
                        <option value="en">{{ $t('account.language.english') }}</option>
                        <option value="nl">{{ $t('account.language.dutch') }}</option>
                    </select>
                </div>

                <div class="w-[45%] flex flex-col">
                    <label for="email" class="mb-2">{{ $t('account.email') }}:</label>
                    <input 
                        class="mb-6 text-MainWhite bg-transparent border-MainWhite/50 border-2 p-4 rounded-full"
                        type="text"
                        name="email"
                        id="email"
                        v-bind:readonly="!userEditActive"
                        v-bind:placeholder='userResult.getUserByUid.email ? userResult.getUserByUid.email : "No email found!"'
                        v-model="UpdatedUserInfo.email"
                    />
                </div>


                <div class="w-[45%] flex flex-col">
                    <label for="phoneNumber" class="mb-2">{{ $t('account.phone.number') }}:</label>
                    <input 
                        class="mb-6 text-MainWhite bg-transparent border-MainWhite/50 border-2 p-4 rounded-full"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        v-bind:readonly="!userEditActive"
                        v-model="UpdatedUserInfo.phoneNumber"
                        v-bind:placeholder='userResult.getUserByUid.phoneNumber ? userResult.getUserByUid.phoneNumber : "No phone number found!"'
                    />
                </div>

                <!-- <div class="w-[45%] flex flex-col">
                    <label for="phoneNumber" class="mb-2">Phone number:</label>
                    <input 
                        class="mb-6 text-MainWhite bg-transparent border-MainWhite/50 border-2 p-4 rounded-full"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        v-bind:readonly="!userEditActive"
                        v-model="UpdatedUserInfo.phoneNumber"
                        v-bind:placeholder='userResult.getUserByUid.phoneNumber ? userResult.getUserByUid.phoneNumber : "No phone number found!"'
                    />
                </div> -->
            </div>
        </div>   

        <!-- werkuren -->
        <section v-if="userResult.getUserByUid.role == 'STAFF' || userResult.getUserByUid.role == 'ADMIN'">
            <div class="inline-flex items-center justify-center w-full">
                <hr class="w-3/4 h-px translate-y-0.5 my-8 bg-MainWhite/15 border-0">
            </div>
            <div class="flex w-full justify-center mb-4">
                <h1 class="text-left w-3/4 font-semibold text-2xl">{{ $t('account.work.days.title') }}</h1>
            </div>
            
            <div class="flex justify-center text-left">
                <table class="table-auto w-8/12">
                    <thead class="">
                        <tr>
                            <th class="pr-8 pl-2 border-r pb-4">
                                {{ $t('account.work.days.workdays') }}
                            </th>
                            <th class="pr-8 pb-4 border-r pl-2">
                                {{ $t('account.work.days.start') }}
                            </th>
                            <th class="pr-8 pb-4 pl-2">
                                {{ $t('account.work.days.end') }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" class="odd:bg-black/15">
                            <td class="p-2 border-r">{{ item.werkdagen }}</td>
                            <td class="p-2 border-r">{{ item.Start_uur }}</td>
                            <td class="p-2">{{ item.Eind_uur }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>  
        </section>

    <!-- VakantieDagen -->
    <section
      v-if="
        userResult.getUserByUid.role == 'STAFF' ||
        userResult.getUserByUid.role == 'ADMIN'
      "
    >
      <div class="inline-flex items-center justify-center w-full">
        <hr class="w-3/4 h-px translate-y-0.5 my-8 bg-MainWhite/15 border-0" />
      </div>

            <div class="flex w-full justify-center mb-4">
                <h1 class="text-left w-3/4 font-semibold text-2xl">{{ $t('account.vacation.title') }}</h1>
            </div>
            
            <div class="flex justify-center text-left">
                <table class="table-auto w-8/12">
                    <thead class="">
                        <tr>
                            <th class="pr-8 pl-2 pb-4 border-r">
                                {{ $t('account.vacation.begin') }}
                            </th>
                            <th class="pr-8 pb-4 pl-2">
                                {{ $t('account.vacation.end') }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in VakantieDagen" class="odd:bg-black/15">
                            <td class="border-r p-2">{{ item.from }}</td>
                            <td class="p-2">{{ item.to }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>  
        </section>
        
        <!-- List of all staffmembers (only visible when ADMIN) -->
        <section v-if="userResult.getUserByUid.role == 'ADMIN'">
            <div class="inline-flex items-center justify-center w-full">
                <hr class="w-3/4 h-px translate-y-0.5 my-8 bg-MainWhite/15 border-0">
            </div>

            <div class="flex w-full justify-center mb-4">
                <div class="w-3/4 flex align-middle gap-8">
                    <h1 class="text-left  font-semibold text-2xl">{{ $t('account.staff.title') }}</h1>
                    <Button @click="showModal = !showModal, console.log(showModal)" class="text-md flex items-center">
                        <font-awesome-icon class="mr-2" icon="plus" /> {{ $t('account.staff.add') }}
                    </Button>
                </div>
            </div>
            <!-- overlay -->
            <div class="fixed flex justify-center align-middle z-10 top-0 left-0 w-full min-h-screen bg-black/50" 
            v-if="showModal">
                <!-- modal -->
                <div class="relative  z-50 my-auto bg-MainWhite text-BgBlack text-left flex flex-col rounded-lg">
                    <div class="ml-10 mx-40 my-20">
                            
                        <button class="absolute top-3 right-3 border-2 border-BgBlack px-2 py-1 rounded-lg focus:text-AccentBlue focus:outline-none hover:text-AccentBlue ease-in-out duration-200" @click="showModal = !showModal"><font-awesome-icon icon="fa-solid fa-xmark" /></button>
                        
                        <h1>{{ $t('account.staff.modal.title') }}</h1>

                        <form class="flex flex-col" @submit.prevent="newStaff">

                            <label for="name">{{ $t('account.name') }}</label>
                            <input 
                                type="text"
                                name="name"
                                id="name"
                                v-model="newStaffMember.name"
                                required
                            />

                            <label for="familyName">{{ $t('account.staff.modal.family.name') }}</label>
                            <input 
                                type="text"
                                name="familyName"
                                id="familyName"
                                v-model="newStaffMember.familyName"
                                required
                            />

                            <label for="phoneNumber">{{ $t('account.phone.number') }}</label>
                            <input 
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                v-model="newStaffMember.phoneNumber"
                                required
                            />

                            <label for="role">{{ $t('account.staff.modal.function') }}</label>
                            <Dropdown
                                :options="options"
                                v-model="newStaffSelectedRole"
                            />
                            <!-- <p>Selected option: {{ newStaffMember.role }}</p> -->

                            <label for="bruto">{{ $t('account.staff.modal.bruto') }}</label>
                            <input 
                                type="number"
                                name="bruto"
                                id="bruto"
                                v-model="newStaffMember.brutoMonthlyWage"
                                required
                            />

                            <label for="password">{{ $t('account.password') }}</label>
                            <input 
                                type="text"
                                name="password"
                                id="password"
                                v-model="newStaffMember.password"
                                required
                            />
                            <p class="font-semibold" :class="{ 'text-green-700' : passwordLength(newStaffMember.password), 'text-red-500' : !passwordLength(newStaffMember.password) }">{{ passwordLength(newStaffMember.password) ? "Je wachtwoord bevat 8 tekens" : "Moet minstens 8 tekens bevatten" }}</p>

                            <div>
                                <Button class="mt-4 hover:text-MainWhite" type="submit">
                                    {{ $t('account.staff.add') }}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <div class="flex justify-center text-left">
                <table class="table-auto w-8/12">
                    <thead class="">
                        <tr>
                            <th class="pr-8 pl-2 pb-4 border-r hidden md:block">
                                {{ $t('account.name') }}
                            </th>
                            <th class="pr-8 pb-4 pl-2 border-r">
                                {{ $t('account.email') }}
                            </th>
                            <!-- <th class="pr-8 pb-4 pl-2 border-r hidden">
                                Phone number
                            </th> -->
                            <th class="pr-8 pb-4 pl-2 lg:border-r">
                                {{ $t('account.staff.modal.function') }}
                            </th>
                            <th class="pr-8 pb-4 pl-2 hidden 2xl:block">
                                Job
                            </th>
                            <!-- <th class="pr-8 pb-4 pl-2 hidden lg:block">
                                Bruto income
                            </th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in staffResult.getAllStaff" class="odd:bg-black/15">
                            <td class="md:border-r p-2 hidden md:block">{{ item.name }}</td>
                            <td class="border-r p-2">{{ item.email }}</td>
                            <!-- <td class="border-r p-2 hidden">{{ item.phoneNumber ? item.phoneNumber : "No phone number" }}</td> -->
                            <td class="lg:border-r p-2">{{ item.role }}</td>
                            <td class=" p-2 hidden 2xl:block">{{ item.job ? item.job : "No current job" }}</td>
                            <!-- <td class="xl:border-r p-2 hidden lg:block">{{ item.brutoMonthlyWage ? item.brutoMonthlyWage : "No income" }}</td> -->
                            <td class="p-2"><button class="hover:text-red-500 ease-in-out duration-200 focus:text-red-500 focus:outline-none"><font-awesome-icon icon="fa-solid fa-trash" /></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>  
        </section>    
    </div>
    <div v-else>
        <p>{{ $t('account.unsanctioned.acces') }}</p>
        <Button @click="logoutUser" >
            {{ $t('account.log.out') }}
        </Button>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import {ref, computed } from 'vue'
    import { getAuth, updateCurrentUser } from 'firebase/auth'
    import useFirebase from '@/composables/useFirebase'
    import { useI18n } from 'vue-i18n'
    import { GET_USER_BY_UID } from '@/graphql/user.query'
    import { GET_ALL_STAFF } from '@/graphql/allStaff.query'
    import { useMutation, useQuery } from '@vue/apollo-composable'
    import Button from '../components/generic/CtaButton.vue'
    import { table } from 'console'
    import type { CustomUser } from '@/interfaces/user.interface'
    import { ADD_USER, CHANGE_USER_INFO } from '@/graphql/user.mutation'
    import useCustomUser from '@/composables/useCustomUser'
    import { type AuthError } from 'firebase/auth'
    import Dropdown from '../components/generic/DropDown.vue'

    const { firebaseUser, logout } = useFirebase()
    const { replace } = useRouter()
    const { locale } = useI18n()
    const userEditActive = ref(false)
    const admin = ref(false)
    const staffEdit = ref(false)
    const { customUser } = useCustomUser()
    const showModal = ref(false)
    const { register } = useFirebase()

    const error = ref<AuthError | null>(null)


    //dropdown
    const options = ref([ 'STAFF', 'ADMIN' ])
    const newStaffSelectedRole = ref(null)


    //Query get info from current logged in user
    const { result } = useQuery(GET_USER_BY_UID, {uid: firebaseUser.value?.uid})
    const userResult = computed(() => result.value)

    //As admin get info from all registered staff
    const resultStaff = useQuery(GET_ALL_STAFF)
    const staffResult = computed(() => resultStaff.result.value)

    //Mutation to change current logged in user information
    const { mutate: changeUserinfo } = useMutation<CustomUser>(CHANGE_USER_INFO)

    //Mutation to add a staffmember
    const { mutate: addUser } = useMutation<CustomUser>(ADD_USER)

    
    
    const userInfo = ref({
        name: userResult.value?.getUserByUid.name,
        email: userResult.value?.getUserByUid.email,
        phoneNumber: userResult.value?.getUserByUid.phoneNumber,
        fullName: userResult.value?.getUserByUid.fullname,
        lang: userResult.value?.getUserByUid.locale
    })

    const UpdatedUserInfo = ref({
        name: null,
        email: null,
        phoneNumber: null,
        familyName: null,
        locale: "nl"
    })

    const newStaffMember = ref({
        name: '',
        familyName:'',
        password: '',
        role: newStaffSelectedRole,
        phoneNumber: '',
        brutoMonthlyWage: '',
    })
    
    const items = [
        { werkdagen: 'Monday', Start_uur: '13:30', Eind_uur: '18:30' },
        { werkdagen: 'Tuesday', Start_uur: '13:30', Eind_uur: '18:30' },
        { werkdagen: 'Wednesday', Start_uur: '09:30', Eind_uur: '13:30' },
        { werkdagen: 'Thursday', Start_uur: '09:30', Eind_uur: '13:30' },
        { werkdagen: 'Friday', Start_uur: '10:00', Eind_uur: '14:30' }
    ]

const VakantieDagen = [
  { from: "02 april", to: "16 april" },
  { from: "15 july", to: "15 august" },
  { from: "20 december", to: "27 december" },
]

    const passwordLength = (Password : string) => {
        return Password.length >= 8 ? true : false
    }

    const Save = () => {
        changeUserinfo({
            updateUserInput: {
                uid: firebaseUser.value?.uid,
                fullname: UpdatedUserInfo.value.name,
                email: UpdatedUserInfo.value.email ? UpdatedUserInfo.value.email : userInfo.value.email,
                name: UpdatedUserInfo.value.name ? UpdatedUserInfo.value.name : userInfo.value.name,
                phoneNumber: UpdatedUserInfo.value.phoneNumber ? UpdatedUserInfo.value.phoneNumber : userInfo.value.phoneNumber,
                locale: UpdatedUserInfo.value.locale
            }
        }).then(result => {
            if(!result?.data) throw new Error('User update failed')

            customUser.value = result.data
            console.log(userResult)
            window.location.reload()
        })
    }

    const newStaff = () => {
        if(passwordLength(newStaffMember.value.password)){
            console.log(newStaffMember.value.name, newStaffMember.value.name + '.' + newStaffMember.value.familyName + '@pretpark.be', newStaffMember.value.password)
            register(newStaffMember.value.name, newStaffMember.value.name + '.' + newStaffMember.value.familyName + '@pretpark.be', newStaffMember.value.password)
            .then(() => {
                addUser({
                    createUserInput: {
                        name: newStaffMember.value.name,
                        familyName: newStaffMember.value.familyName,
                        email: newStaffMember.value.name + '.' + newStaffMember.value.familyName + '@pretpark.be',
                        role: newStaffMember.value.role,
                        locale: locale.value,
                        phoneNumber: newStaffMember.value.phoneNumber,
                        brutoMonthlyWage: newStaffMember.value.brutoMonthlyWage,
                        fullname: newStaffMember.value.name + ' ' + newStaffMember.value.familyName
                    }
                }).then(result => {
                    if (!result?.data) throw new Error('Custom user creation failed')

                    customUser.value = result.data
                    console.log(newStaffMember)
                })
            })
            .catch(err => {
                error.value = err
            }) 
        }
    }


const logoutUser = () => {
  logout().then(() => {
    replace({ path: "/" })
  })
}
</script>
