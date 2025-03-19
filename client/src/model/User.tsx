import { IProduct } from "./Product"

export interface User {
    cart:ICart[]
}
interface ICart{
    productId:IProduct,
    quantity:number
}