import gql from "graphql-tag"

export const GET_ALL_TICKET_TYPES = gql`
  query ticketType {
    getAllTicketTypes {
      name
      amount
      price
      id
    }
  }
`
