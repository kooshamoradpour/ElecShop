// import productSchema from "./Product.js"
// import userSchema from './User.js'
import { model, Schema, type Document } from "mongoose"
import { IProduct } from "./Product.js"
import { IUser } from './User.js'

export interface ICart extends Document {
    user: IUser;
    product: IProduct[];
}

const cartSchema = new Schema<ICart>({
    user:{type: Schema.Types.ObjectId, ref: 'User'},
    product: [{type: Schema.Types.ObjectId, ref: 'Product'}],
})
const Cart = model<ICart>('Cart', cartSchema);
export default Cart;