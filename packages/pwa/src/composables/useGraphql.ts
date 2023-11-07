import {
  from,
  createHttpLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client/core"
import { onError } from '@apollo/client/link/error'
import { logErrorMessages } from '@vue/apollo-util'
import { setContext } from "@apollo/client/link/context"

import useFirebase from "./useFirebase"

const { firebaseUser } = useFirebase()

const httpLink = createHttpLink({
  uri: "http://[::1]:3000/graphql",
  credentials: "same-origin",
})

const authLink = setContext(async (_, { headers }) => ({
  headers: {
    ...headers,
    authorization: firebaseUser.value ? `Bearer ${await firebaseUser.value.getIdToken()}` : ``,
  },
}))

// Handle errors
const errorLink = onError((error) => {
  if (import.meta.env.DEV) logErrorMessages(error)
})

const apolloClient = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
})

export default () => {
  return {
    apolloClient,
  }
}
