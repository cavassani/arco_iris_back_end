import shopRepository from '../repository/ShopCart.js'
import productRepository from '../repository/Product.js'
import createError from 'http-errors'

const handleNotFound = (result) => {
    if(!result) {
        throw createError(404, 'Carrinho não encontrado!!')
    }
    return result
}

const ShopCart = {
    async addItemToCart(request,response) {
        const { productId } = request.body
        const quantity = Number.parseInt(request.body.quantity)

        try {
            let cart = await shopRepository.ShopCart();

            let productDetails = await productRepository.byId(productId)
            console.log(productDetails)
            if (!productDetails) {
                return response.status(500).json({
                    type: "Não encontrado",
                    msg: " Requisiçao invalida"
                })
            }

            if (cart) {
                const indexFound = cart.items.findIndex(item => item.productId.id == productId);

                if(indexFound !== -1 && quantity <=0) {
                    cart.items.splice(indexFound, 1);

                    if(cart.items.length == 0) {
                        cart.subTotal ==0;

                    } else { cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc +next);}
                }
                else if (indexFound !== -1) {
                    cart.items[indexFound].quantity = cart.items[indexFound].quantity +quantity;
                    cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                    cart.items[indexFound].price = productDetails.price
                    cart.subTotal = cart.items.map(item=> item.total).reduce((acc,next) => acc + next)

                }
                else if (quantity > 0) {
                    cart.items.push({
                        productId: productId,
                        quantity: quantity,
                        price: productDetails.price,
                        total: parseInt(productDetails.price *quantity)
                    })
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc +next)
                }
                else {
                    return response.status(400).json({
                        type: "invalid",
                        msg: "requisiçao invalida"
                    })
                }
                let data = await cart.save();

                response.status(200).json({
                    type: "success",
                    msg: "Processou com sucesso",
                    data: data
                })
            }
            else {
                const cartData = {
                    items: [{
                        productId: productId,
                        quantity: quantity,
                        total: parseInt(productDetails.price * quantity),
                        price: productDetails.price
                    }],
                    subTotal: parseInt(productDetails.price * quantity)
                }
                cart = await cartRepository.addItem(cartData)
                // let data = await cart.save();
                res.json(cart);
            }
        } catch (error) {
            response.status(400).json({
                type: "invalid",
                msg: "Algo deu errado",
                error: error
            })
        }
    },
    async getCart(request, response) {
        try {
            let cart = await shopRepository.carts()

            if (!cart) {
                return response.status(400).json({
                    type: "invalid",
                    msg: "Carrinho não encontrado"
                })
            }

            response.status(200).json({
                status: true,
                data: cart
            })
        } catch (error) {
            response.status(400).json({
                type: "invalid",
                msg: "Algo deu errado",
                error: error
            })
        }
    },
    async emptyCart(request, response) {
        try {
            let cart = await shopRepository.carts();
            cart.items = []
            cart.subTotal = 0
            let data = await cart.save();
            response.status(200).json({
                type:"sucess",
                msg:"Carrinho foi limpo",
                data: data
            })
        } catch (error) {
            response.status(200).json({
                type: "invalid",
                msg: "Algo deu errado ao tentar limpar carrinho",
                error: error
            })
        }
    }
}

export default ShopCart