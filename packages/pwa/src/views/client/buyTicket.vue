<template>
  <form
    @submit.prevent="buytickets"
    class="flex mt-16 justify-center items-center text-BgBlack"
  >
    <div
      class="rounded-lg max-w-sm shadow-[0_0_60px_-25px_rgba(0,0,0,0.3)] shadow-AccentBlue p-12 bg-MainWhite"
    >
      <div v-for="type in newOrder.types" :key="type.name" class="mb-2">
        <input
          type="number"
          v-model="type.count"
          :id="type.name"
          placeholder="0"
          class="mr-2 rounded-lg border-2 p-2 shadow-inner shadow-gray-400 w-20 transition-colors ease-in-out duration-300 hover:border-AccentBlue focus:outline-none focus:ring-4 focus:ring-AccentBlue appearance-none"
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

      <div class="mb-6">
        <label for="date" class="mb-4 font-medium">email</label>
        <input
          type="date"
          name="date"
          id="date"
          v-model="newOrder.date"
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
import { useQuery, useMutation } from "@vue/apollo-composable"
import { GET_ALL_TICKET_TYPES } from "@/graphql/ticketTypes.query"
import { ADD_TICKET } from "@/graphql/createTicket.mutation"
import { GET_USER_BY_UID } from "@/graphql/user.query"
import { ref } from "vue"
import { computed } from "vue"
import useFirebase from "@/composables/useFirebase"

const { mutate: createTicket, onDone: created } = useMutation(ADD_TICKET)
const { firebaseUser } = useFirebase()

//interfaces
interface TicketType {
  name: string
  price: number
  amount: number
  id: string
  count: number
}

interface NewOrder {
  email: string
  date: Date | null
  types?: TicketType[]
}

const {
  result,
  onResult,
  loading: loadingTypes,
} = useQuery(GET_ALL_TICKET_TYPES)
const TypeResults = computed(() => result.value)

const newOrder = ref<NewOrder>({ email: "", date: null, types: [] })

onResult(() => {
  console.log("result")
  console.log(TypeResults.value.getAllTicketTypes)
  TypeResults.value.getAllTicketTypes.forEach((ticketType: TicketType) => {
    newOrder.value.types?.push({
      name: ticketType.name,
      price: ticketType.price,
      amount: ticketType.amount,
      id: ticketType.id,
      count: 0,
    })
  })
})

const buytickets = () => {
  console.log(newOrder.value)
  newOrder.value.types?.forEach(type => {
    for (let i = 0; i < type.count; i++) {
      createTicket({
        createTicketInput: {
          typeId: type.id,
          startDay: newOrder.value.date,
          clientUid: firebaseUser.value ? firebaseUser.value.uid : null,
        },
      })
        .catch(err => {
          console.log(err)
        })
        .then(result => {
          console.log(result)
        })
    }
  })
}
</script>
