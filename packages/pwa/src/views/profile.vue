<template>
  <div v-if="userResult" class="flex text-center flex-col pb-8">
    <div class="flex justify-center items-center mt-16 gap-8">
      <img
        class="rounded-full lg:w-1/7 self-center"
        src="../components/img/coding-logo-design-template-free-vector.jpg"
        alt=""
      />
      <div class="flex flex-col gap-4">
        <p class="text-2xl font-medium text-left">
          {{ userResult.getUserByUid.name }}
        </p>
        <Button
          v-if="!userEditActive"
          class="text-sm"
          @click="userEditActive = !userEditActive"
        >
          <p>Edit</p>
        </Button>
        <Button
          v-else
          class="text-sm"
          @click="userEditActive = !userEditActive"
        >
          <p>Save</p>
        </Button>
        <Button @click="logoutUser">
          {{ $t("Logout") }}
        </Button>
      </div>
    </div>

    <div class="inline-flex items-center justify-center w-full">
      <hr class="w-3/4 h-px translate-y-0.5 my-8 bg-MainWhite border-0" />
    </div>

    <div class="flex justify-center">
      <div class="justify-between text-left flex flex-wrap w-8/12">
        <div class="w-[45%] flex flex-col">
          <label for="fullName" class="mb-2">Full name:</label>
          <input
            class="mb-6 text-MainWhite border-MainWhite/50 bg-transparent border-2 p-4 rounded-full"
            type="text"
            name="fullName"
            id="fullName"
            v-bind:readonly="!userEditActive"
            v-bind:placeholder="
              userResult.getUserByUid.fullName
                ? userResult.getUserByUid.fullName
                : 'No full name found!'
            "
            v-model="userInfo.fullName"
          />
        </div>

        <div class="w-[45%] flex flex-col">
          <label for="email" class="mb-2">Email:</label>
          <input
            class="mb-6 text-MainWhite bg-transparent border-MainWhite/50 border-2 p-4 rounded-full"
            type="text"
            name="email"
            id="email"
            v-bind:readonly="!userEditActive"
            v-bind:placeholder="
              userResult.getUserByUid.email
                ? userResult.getUserByUid.email
                : 'No email found!'
            "
            v-model="userResult.getUserByUid.email"
          />
        </div>

        <div class="w-[45%] flex flex-col">
          <label for="phoneNumber" class="mb-2">Phone number:</label>
          <input
            class="text-MainWhite border-MainWhite/50 bg-transparent border-2 p-4 rounded-full"
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            v-bind:readonly="!userEditActive"
            v-model="userInfo.phoneNumber"
            v-bind:placeholder="
              userResult.getUserByUid.phoneNumber
                ? userResult.getUserByUid.phoneNumber
                : 'No phone number found!'
            "
          />
        </div>
      </div>
    </div>

    <!-- werkuren -->
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
        <h1 class="text-left w-3/4 font-semibold text-2xl">
          When do I have to work?
        </h1>
      </div>

      <div class="flex justify-center text-left">
        <table class="table-auto w-8/12">
          <thead class="">
            <tr>
              <th class="pr-8 pl-2 border-r pb-4">Workdays</th>
              <th class="pr-8 pb-4 border-r pl-2">Start</th>
              <th class="pr-8 pb-4 pl-2">End</th>
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
        <h1 class="text-left w-3/4 font-semibold text-2xl">
          When do I have my vacation?
        </h1>
      </div>

      <div class="flex justify-center text-left">
        <table class="table-auto w-8/12">
          <thead class="">
            <tr>
              <th class="pr-8 pl-2 pb-4 border-r">Begin vacation</th>
              <th class="pr-8 pb-4 pl-2">End vacation</th>
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
        <hr class="w-3/4 h-px translate-y-0.5 my-8 bg-MainWhite/15 border-0" />
      </div>

      <div class="flex w-full justify-center mb-4">
        <h1 class="text-left w-3/4 font-semibold text-2xl">
          All staff members
        </h1>
      </div>

      <div class="flex justify-center text-left">
        <table class="table-auto w-8/12">
          <thead class="">
            <tr>
              <th class="pr-8 pl-2 pb-4 border-r">Name</th>
              <th class="pr-8 pb-4 pl-2 border-r">Email</th>
              <th class="pr-8 pb-4 pl-2 border-r">Phone number</th>
              <th class="pr-8 pb-4 pl-2 border-r">Function</th>
              <th class="pr-8 pb-4 pl-2 border-r">Job</th>
              <th class="pr-8 pb-4 pl-2">Bruto income</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in staffResult.getAllStaff" class="odd:bg-black/15">
              <td class="border-r p-2">{{ item.name }}</td>
              <td class="border-r p-2">{{ item.email }}</td>
              <td class="border-r p-2">
                {{ item.phoneNumber ? item.phoneNumber : "No phone number" }}
              </td>
              <td class="border-r p-2">{{ item.role }}</td>
              <td class="border-r p-2">
                {{ item.job ? item.job : "No current job" }}
              </td>
              <td class="p-2">
                {{
                  item.brutoMonthlyWage ? item.brutoMonthlyWage : "No income"
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
  <div v-else>
    <p>Log in om een account te zien</p>
    <Button @click="logoutUser">
      {{ $t("Logout") }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { ref, computed } from "vue"

import useFirebase from "@/composables/useFirebase"
import { useI18n } from "vue-i18n"
import { GET_USER_BY_UID } from "@/graphql/user.query"
import { GET_ALL_STAFF } from "@/graphql/allStaff.query"
import { useQuery } from "@vue/apollo-composable"
import Button from "../components/generic/CtaButton.vue"
import { datacatalog } from "googleapis/build/src/apis/datacatalog"
import { table } from "console"
import { type } from "os"
import { text } from "node:stream/consumers"

const { firebaseUser, logout } = useFirebase()
const { replace } = useRouter()
const { locale } = useI18n()
const userEditActive = ref(false)
const admin = ref(false)

const { result } = useQuery(GET_USER_BY_UID, { uid: firebaseUser.value?.uid })
const userResult = computed(() => result.value)
// console.log(firebaseUser.value)

const resultStaff = useQuery(GET_ALL_STAFF)
const staffResult = computed(() => resultStaff.result.value)

const userInfo = ref({
  name: "",
  email: "",
  phoneNumber: "",
  fullName: "",
})

const items = [
  { werkdagen: "Monday", Start_uur: "13:30", Eind_uur: "18:30" },
  { werkdagen: "Tuesday", Start_uur: "13:30", Eind_uur: "18:30" },
  { werkdagen: "Wednesday", Start_uur: "09:30", Eind_uur: "13:30" },
  { werkdagen: "Thursday", Start_uur: "09:30", Eind_uur: "13:30" },
  { werkdagen: "Friday", Start_uur: "10:00", Eind_uur: "14:30" },
]

const VakantieDagen = [
  { from: "02 april", to: "16 april" },
  { from: "15 july", to: "15 august" },
  { from: "20 december", to: "27 december" },
]

const loggedIn = () => {}

const logoutUser = () => {
  logout().then(() => {
    replace({ path: "/" })
  })
}
</script>
