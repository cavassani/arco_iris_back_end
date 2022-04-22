import mongoose from "../config/mongoose.js"
import schema from '../schema/ShopCart.js'

const model = mongoose.model('ShopCart', schema)

 const ShopCart = {
     async carts() {
        const carts = await ShopCart.find().populate({
            path: "items.productId",
            select: "name price total"
        });
        return carts[0]
     },
     async payload() {
        const newItem = await ShopCart.create(payload);
        return newItem
    }

 }

 export default ShopCart