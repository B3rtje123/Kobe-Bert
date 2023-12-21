import gql from 'graphql-tag'

export const ADD_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
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
export const CHANGE_USER_INFO = gql`
mutation updateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
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
    createdAt
    updatedAt
  }
}
`