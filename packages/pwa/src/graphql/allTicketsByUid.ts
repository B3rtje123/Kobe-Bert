import gql from "graphql-tag"

export const GET_ALL_TICKETS_BY_UID = gql`
  query ticket {
    getTicketsByUserId {
      id
      startDay
      endDay
      type {
        id
        name
        amount
        price
      }
      isUsed
      barcode
    }
  }
`
