import productSchema from "./Product.js"
import { model, Schema, type Document } from "mongoose"
import { ProductDocument } from "./Product.js"

export interface ICart extends Document {
    userId: string;
    product: ProductDocument[];
}

const cartSchema = new Schema<ICart>({
    _id:
    {
        type: Schema,
    },
    product: [{
        type: productSchema,
        required: true,
    }],
})
const Cart = model<ICart>('Cart', cartSchema);
export default Cart;