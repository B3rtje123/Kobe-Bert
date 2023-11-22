import gql from "graphql-tag"

export const GET_ALL_STAFF = gql`
 query GetAllStaff {
  getAllStaff {
    id
    uid
    name
    email
    role
    locale
    fullname
    phoneNumber
    brutoMonthlyWage
    isChief
    job
  }
}
`