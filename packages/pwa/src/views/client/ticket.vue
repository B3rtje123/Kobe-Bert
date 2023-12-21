<template>
  <div class="flex p-4 justify-center m-4">
    <RouterLink
      to="/ticket/buy"
      class="bg-AccentBlue text-2xl lg:text-lg font-semibold text-MainWhite rounded py-1.5 px4 transition ease-in-out duration-300 hover:bg-sky-600 hover:text-BgBlack focus:outline-none focus:bg-transparent focus:ring-4 focus:ring-sky-600 focus:text-AccentBlue"
    >
      Buy tickets
    </RouterLink>
  </div>

  <!-- show tickets from user if logged in -->
  <div class="flex justify-center">
    <table class="table-auto w-8/12" v-if="!ticketsLoading">
      <thead class="">
        <tr>
          <th class="pr-8 pl-2 pb-4 border-r">type</th>
          <th class="pr-8 pb-4 pl-2 border-r">day</th>
          <th class="pb-4 border-r">barcode</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in ticketsResult.getTicketsByUserId"
          class="odd:bg-black/15"
        >
          <!-- <div v-if="item.isUsed == false && new Date(item.endDay) > new Date()"> -->
          <td class="border-r p-2">{{ item.type.name }}</td>
          <td class="border-r p-2">
            {{ new Date(item.endDay).toLocaleDateString() }}
          </td>
          <td class="border-r flex justify-center">
            <vue-barcode
              v-bind:value="item.barcode"
              v-model="item.barcode"
              tag="svg"
            ></vue-barcode>
          </td>
          <!-- </div> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import useFirebase from "@/composables/useFirebase"
import { GET_ALL_TICKETS_BY_UID } from "@/graphql/allTicketsByUid"
import VueBarcode from "@chenfengyuan/vue-barcode"
import { createApp } from "vue"
import { useQuery } from "@vue/apollo-composable"
import { computed } from "vue"
import { useRouter } from "vue-router"
import { watch } from "vue"

const app = createApp({
  components: {
    VueBarcode,
  },
})

const { replace } = useRouter()
const { firebaseUser } = useFirebase()

if (!firebaseUser.value) {
  replace("/ticket/buy")
}

const {
  result: ticketsResult,
  onResult,
  loading: ticketsLoading,
} = useQuery(GET_ALL_TICKETS_BY_UID)

watch(ticketsResult, () => {
  console.log(ticketsResult.value)
  ticketsResult.value.getTicketsByUserId.filter(
    (item: any) => item.isUsed == false && new Date(item.endDay) > new Date(),
  )
})

// onResult(() => {
//   console.log(ticketsResult.value)
//   ticketsResult.value.getTicketsByUserId.filter(
//     (item: any) => item.isUsed == false && new Date(item.endDay) > new Date(),
//   )
//   console.log(ticketsResult.value)
// })

// const validTickets = computed(() => {
//   return ticketsResult.value.getTicketsByUserId.filter(
//     (item: any) => item.isUsed == false && new Date(item.endDay) > new Date(),
//   )
// })
// console.log(validTickets.value)
</script>
