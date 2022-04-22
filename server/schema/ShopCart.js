import mongoose from "../config/mongoose.js"
const { Schema } = mongoose
const CartItem = new Schema({
   productId: {
       type:mongoose.Schema.Types.ObjectId,
       ref: "Product",
   },
   quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantidade não pode ser menor que 1.']
   },
   price: {
    type: Number,
    required: true
   },
   total: {
    type: Number,
    required: true,
  }
})
CartItem.set('timestamps', true);

const ShopCart= new Schema({
    items: [CartItem],
    subTotal: {
        default: 0,
        type: Number
    }
})
ShopCart.set('timestamps', true);

export default ShopCart