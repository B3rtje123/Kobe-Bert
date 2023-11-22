import type { CustomUser } from "@/interfaces/user.interface"
import gql from "graphql-tag"

//moet nog correct ingesteld worden
export const GET_USER_BY_UID = gql`
  query user($uid: String!) {
    getUserByUid(string: $uid) {
      id
      uid
      name
      email
      role
      locale
      fullname
      phoneNumber
    }
  }
`

export interface USER_REGISTER {
  // custom interface om dingen te krijgen van de db
  getUserByUid: CustomUser
}