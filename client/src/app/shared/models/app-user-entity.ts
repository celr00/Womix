import { Photo } from "./photo"

export interface UserEntity {
  id: number
  firstName: string
  lastName: string
  dateOfBirth: string
  facebook: string
  phoneNumber: string
  instagram: string
  appUserPhoto: AppUserPhoto
  appUserCurriculum: AppUserCurriculum
  appUserAddress: AppUserAddress
  showAddress: boolean
}

export interface AppUserPhoto {
  userId: number
  photoId: number
  photo: Photo
}

export interface AppUserCurriculum {
  userId: number
  curriculumId: number
  curriculum: Curriculum
}

export interface Curriculum {
  id: number
  url: string
  publicId: string
}

export interface AppUserAddress {
  userId: number
  addressId: number
  address: Address
}

export interface Address {
  id: number
  number: string
  street: string
  city: string
  state: string
  zipcode: string
}
