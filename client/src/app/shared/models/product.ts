export interface Product {
  id: number
  name: string
  price: number
  description: string
  stockQuantity: number
  productPhotos: ProductPhoto[]
  productItemClass: ProductItemClass
  userProduct: UserProduct
}

interface ProductPhoto {
  photoId: number
  photo: Photo
}

interface Photo {
  id: number
  url: string
}

interface ProductItemClass {
  productId: number
  itemClassId: number
  itemClass: ItemClass
}

interface ItemClass {
  id: number
  name: string
}

interface UserProduct {
  userId: number
  user: User
  productId: number
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
