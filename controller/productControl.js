import { Coupon } from "../model/couponModel.js"
import { Product } from "../model/productModel.js"





export const HomeCoupon = async(req, res)=>{
    res.send("Welcome to Hmepage")
}


export const createProduct = async(req, res)=>{
    const body = req.body

    try {
        const saveBody = new Product(body)
        await saveBody.save()
        res.status(200).json(saveBody)
    } catch (error) {
        res.status(400).json(error.message)
    }
}


export const fetchProduct = async(req, res)=>{
     try {
        const fetchprod = await Product.find({})
        res.status(200).json(fetchprod)
     } catch (error) {
        res.status(400).json(error.message)
     }
}


export const createCoupon = async(req, res)=>{
    const body = req.body
    try {
       const savecoup = new Coupon(body)
       await savecoup.save()
       res.status(200).json(savecoup)
    } catch (error) {
        res.status(400).json(error.message)
    }
}


export const checkoutProduct = async(req, res)=>{
    const {id} = req.body;
    const {coupon} = req.body;
    let nums = []
    let sum = 0
    
    try {
        const getcoup = await Coupon.findOne({name:coupon})
        const elem  = await Product.find({_id:id});
        
        elem.map((data)=>{
           const price = data.price
           nums.push(price)
        })

        for(var i=0; i < nums.length; i++){
            sum += parseInt(nums[i])
        }
        
        if (sum > getcoup.maxPrice) {
            if (elem.length >= getcoup.maxNumber) {
                if (getcoup.amountOff > 0 && getcoup.percentOff > 0) {
                    
                    const realsum = sum - getcoup.amountOff
                    const val = realsum - (realsum * .10);
                    res.status(200).json(`total discount is ${val}`)

                } else if (getcoup.amountOff > 0 && getcoup.percentOff < 1) {

                    const realsum = sum - getcoup.amountOff
                    res.status(200).json(`total discount is ${realsum}`)
                    
                }else if (getcoup.amountOff < 1 && getcoup.percentOff > 0) {

                    const val = sum - (sum * .10);
                    res.status(200).json(`total discount is ${val}`)
                    
                }
            } else {
             res.status(400).json(`total item must be greater than or equal to ${getcoup.maxNumber} to use this coupon`)    
            }
        } else {
            res.status(400).json(`total price must be greater than ${getcoup.maxPrice} to use this coupon`)
        }

    } catch (error) {
        res.status(400).json(error.message)
    }
}