<template>
  <form
    @submit.prevent="buytickets"
    class="flex mt-16 justify-center items-center text-BgBlack"
  >
    <div
      class="rounded-lg max-w-sm shadow-[0_0_60px_-25px_rgba(0,0,0,0.3)] shadow-AccentBlue p-12 bg-MainWhite"
    >
      <div
        v-for="type in TypeResults.getAllTicketTypes"
        :key="type.name"
        class="mb-2"
      >
        <input
          type="number"
          v-model="type.name"
          :id="type.name"
          placeholder="0"
          class="mr-2 rounded-lg border-2 p-2 shadow-inner shadow-gray-400 w-20 transition-colors ease-in-out duration-300 hover:border-AccentBlue focus:outline-none focus:ring-4 focus:ring-AccentBlue"
        />
        <label :for="type.name">{{ type.name.toLowerCase() }}</label>
      </div>

      <div class="mb-6">
        <label for="email" class="mb-4 font-medium">email</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="example@domain.com"
          v-model="newOrder.email"
          required
          autocomplete="off"
          class="block rounded-lg border-2 p-2 shadow-inner shadow-gray-400 w-full transition-colors ease-in-out duration-300 hover:border-AccentBlue focus:outline-none focus:ring-4 focus:ring-AccentBlue"
        />
      </div>

      <button
        type="submit"
        class="w-full py-2 border border-hidden rounded-lg mb-8 font-semibold bg-AccentBlue text-MainWhite transition ease-in-out duration-300 hover:bg-BgBlack/25 hover:text-BgBlack focus:outline-none focus:ring-4 focus:ring-AccentBlue focus:bg-[#1B8ACC]"
      >
        buy tickets
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable"
import { GET_ALL_TICKET_TYPES } from "@/graphql/ticketTypes.query"
import { ref } from "vue"
import { computed } from "vue"

const newOrder = ref({ email: "" })

const ticketTypes = useQuery(GET_ALL_TICKET_TYPES)
const TypeResults = computed(() => ticketTypes.result.value)

const buytickets = () => {
  console.log("buyticket")
}
</script>
