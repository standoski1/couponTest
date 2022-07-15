import express from 'express'
import { checkoutProduct, createCoupon, createProduct, fetchProduct, HomeCoupon } from '../controller/productControl.js';



const router = express.Router();


router.post('/createproduct', createProduct)
router.get('/fetchproduct', fetchProduct)
router.post('/checkout', checkoutProduct)
router.post('/createcoupon', createCoupon)
router.get('/', HomeCoupon)


export default router;