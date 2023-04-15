export interface JobWithInterest {
  id: number
  name: string
  description: string
  salary: number
  jobArea: JobArea
  userJobInterests: UserJobInterest[]
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

export interface UserJobInterest {
  user: User
  userId: number
  jobId: number
}

export interface User {
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
}

export interface Address {
  number: string
  street: string
  city: string
  state: string
  zipcode: string
  id: number
}
