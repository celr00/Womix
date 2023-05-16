export interface AppUser {
  id: number
  phoneNumber: string
  userName: string
  email: string
  fullName: string
  dateOfBirth: string
  facebook: string
  instagram: string
  photoUrl: string
  age: number
  address: Address
  showAddress: boolean
}

interface Address {
  number: string
  street: string
  city: string
  state: string
  zipcode: string
  id: number
}
