// // import productSchema from "./Product.js"
// // import userSchema from './User.js'
// import { Schema, type Document } from "mongoose"
// import { IProduct } from "./Product.js"
// import { IUser } from './User.js'

// export interface ICart extends Document {
//     user: IUser;
//     product: IProduct[];
// }

// const cartSchema = new Schema<ICart>({
//     product: [{type: Schema.Types.ObjectId, ref: 'Product'}],
//      quantity: {type:Number, min:1}
// })
// // const Cart = model<ICart>('Cart', cartSchema);
// export default cartSchema;