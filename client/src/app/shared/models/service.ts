import { Photo } from "./photo"

export interface Service {
  id: number
  name: string
  description: string
  servicePhotos: ServicePhoto[]
  serviceCategory: ServiceCategory
  userService: UserService
}

interface ServicePhoto {
  photoId: number
  photo: Photo
}

interface ServiceCategory {
  serviceId: number
  categoryId: number
  category: Category
}

export interface Category {
  id: number
  name: string
}

interface UserService {
  userId: number
  user: User
  serviceId: number
}

interface User {
  id: number
  phoneNumber: string
  email: string
  firstName: string
  lastName: string
  dateOfBirth: string
  facebook: string
  instagram: string
}
