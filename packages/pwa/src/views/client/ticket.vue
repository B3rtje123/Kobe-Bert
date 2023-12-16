<template>
  <RouterLink to="/buyTickets"> Buy tickets </RouterLink>

  <!-- show tickets from user if logged in -->
  <table class="table-auto w-8/12" v-if="firebaseUser != null">
    <thead class="">
      <tr>
        <th class="pr-8 pl-2 pb-4 border-r">type</th>
        <th class="pr-8 pb-4 pl-2 border-r">day</th>
        <th class="pr-8 pb-4 pl-2 border-r">barcode</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in ticketResult.getTicketsByUserId"
        class="odd:bg-black/15"
      >
        <div v-if="item.isUsed == false && new Date(item.endDay) > new Date()">
          <td class="border-r p-2">{{ item.type.name }}</td>
          <td class="border-r p-2">
            {{ new Date(item.endDay).toLocaleDateString() }}
          </td>
          <td class="border-r p-2">
            <vue-barcode
              v-bind:value="item.barcode"
              v-model="item.barcode"
              tag="svg"
            ></vue-barcode>
          </td>
        </div>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import useFirebase from "@/composables/useFirebase"
import { GET_ALL_TICKETS_BY_UID } from "@/graphql/allTicketsByUid"
import VueBarcode from "@chenfengyuan/vue-barcode"
import { createApp } from "vue"
import { useQuery } from "@vue/apollo-composable"
import { computed } from "vue"

const app = createApp({
  components: {
    VueBarcode,
  },
})

const tickets = useQuery(GET_ALL_TICKETS_BY_UID)
const ticketResult = computed(() => tickets.result.value)

const { firebaseUser } = useFirebase()
</script>
