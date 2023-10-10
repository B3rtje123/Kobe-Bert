import type { CustomUser } from "@/interfaces/user.interface"
import useFirebase from "./useFirebase"
import { GET_USER_BY_UID } from "@/graphql/user.query"
import { ref } from "vue"
import useGraphql from "./useGraphql"
import { useQuery } from "@vue/apollo-composable"

const customUser = ref<CustomUser>()

const { firebaseUser } = useFirebase()
const { apolloClient } = useGraphql()

const restoreCustomUser = () => {
  return new Promise<void>(resolve => {
    const { onResult } = useQuery(GET_USER_BY_UID, {
      uid: firebaseUser.value?.uid,
    })
    onResult(result => {
      if (result.data) {
        console.log(result)
        customUser.value = result.data.userByUid
        resolve()
      }
    })
  })
}

export default () => {
  return {
    customUser,
    restoreCustomUser,
  }
}
