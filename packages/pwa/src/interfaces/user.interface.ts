export enum Role {
  ADMIN = "ADMIN",
  STAFF = "STAFF",
  USER = "USER",
}

export interface CustomUser {
    id: string
    uid: string
    locale?: string
}
