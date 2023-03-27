export interface Product {
  id: number
  name: string
  price: number
  description: string
  productPhotos: ProductPhoto[]
  productItemClassId: number
  productItemClass: string
  seller: Seller
  stockQuantity: number
}

interface ProductPhoto {
  photoId: number
  photo: Photo
}

interface Photo {
  id: number
  url: string
}

interface Seller {
  id: number
  fullName: string
  dateOfBirth: string
  facebook: string
  instagram: string
}
