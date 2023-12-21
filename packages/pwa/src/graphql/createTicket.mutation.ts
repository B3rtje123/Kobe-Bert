import gql from "graphql-tag"

export const ADD_TICKET = gql`
  mutation Ticket($createTicketInput: CreateTicketInput!) {
    createTicket(createTicketInput: $createTicketInput) {
      startDay
      endDay
      barcode
      type {
        name
      }
    }
  }
`
