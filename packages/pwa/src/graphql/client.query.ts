import gql from "graphql-tag"

//temp values
export const ALL_CLIENTS = gql`
  {
    clients {
      id
      name
      email
      phone
      address
      city
      state
      zip
    }
  }
`
