import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
        },
    price: { 
        type: Number,
        required: true
        },
    
}, {timestamps: true})

export const Product = mongoose.model('product', productSchema)
