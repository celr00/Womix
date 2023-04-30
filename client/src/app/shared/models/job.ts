export interface Job {
  id: number
  name: string
  description: string
  salary: number
  jobArea: JobArea
  userJob: UserJob
  userJobInterests: UserJobInterest[]
}

interface JobArea {
  jobId: number
  areaId: number
  area: Area
}

export interface Area {
  id: number
  name: string
  areaPhoto: AreaPhoto
}

interface AreaPhoto {
  areaId: number
  photoId: number
  photo: Photo
}

interface Photo {
  id: number
  url: string
}

interface UserJob {
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

interface AppUserAddress {
  userId: number
  addressId: number
  address: Address
}

interface Address {
  id: number
  number: string
  street: string
  city: string
  state: string
  zipcode: string
}

interface UserJobInterest {
  user: User
  userId: number
  jobId: number
}

interface AppUserPhoto {
  userId: number
  photoId: number
  photo: Photo
}
