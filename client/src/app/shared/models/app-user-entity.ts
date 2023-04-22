export interface UserEntity {
  firstName: string
  lastName: string
  dateOfBirth: Date
  facebook: string
  phoneNumber: string
  instagram: string
  appUserPhoto: AppUserPhoto
  appUserAddress: AppUserAddress
}

interface AppUserPhoto {
  userId: number
  photoId: number
  photo: Photo
}

interface Photo {
  url: string
  id: number
}

interface AppUserAddress {
  userId: number
  addressId: number
  address: Address
}

interface Address {
  number: string
  street: string
  city: string
  state: string
  zipcode: string
  id: number
}
