import gql from "graphql-tag"

//moet nog correct ingesteld worden
export const GET_USER_BY_UID = gql`
  query user($uid: String!) {
    userByUid(string: $uid) {
      id
      uid
      locale
    }
  }
`
