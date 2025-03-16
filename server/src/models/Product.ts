import { model, Schema, type Document } from 'mongoose';

export interface ProductDocument extends Document {
    productId: string;
    name: string;
    description: string;
    image: string;
    price: number;
    stock: number;
}

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const productSchema = new Schema<ProductDocument>({
    productId:
    {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },

    price: {
        type: Number,
        required: true,
    },
    stock: { // should be stock!!
        type: Number,
        required: true,
    }
})
const Product = model<ProductDocument>('Product', productSchema)

export default Product
