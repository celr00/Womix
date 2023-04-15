export interface Job {
  id: number
  name: string
  description: string
  salary: number
  jobArea: JobArea
  userJob: UserJob
}

export interface JobArea {
  jobId: number
  areaId: number
  area: Area
}

export interface Area {
  id: number
  name: string
  areaPhoto: AreaPhoto
}

export interface AreaPhoto {
  areaId: number
  photoId: number
  photo: Photo
}

export interface Photo {
  id: number
  url: string
}

export interface UserJob {
  userId: number
  user: User
  jobId: number
}

export interface User {
  id: number
  phoneNumber: string
  email: string
  firstName: string
  lastName: string
  dateOfBirth: string
  facebook: string
  instagram: string
  appUserPhoto: AppUserPhoto
  appUserAddress: AppUserAddress
}

export interface AppUserPhoto {
  userId: number
  photoId: number
  photo: Photo2
}

export interface Photo2 {
  id: number
  url: string
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
