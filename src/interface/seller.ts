import { IAddress } from "./address"

export interface ISeller {
  id: string
  seller_name: string
  phoneNumber: string
  email: string
  address: IAddress
  owner_name: string
  owner_phone: string
}
