import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
        },
    maxPrice: { 
        type: Number,
        required: true
        },
    maxNumber: { 
        type: Number,
        default: 0
        },
    amountOff: { 
        type: Number,
        default: 0
        },
    percentOff: { 
        type: Number,
        default: 0
        },
    
}, {timestamps: true})

export const Coupon = mongoose.model('coupon', couponSchema)
