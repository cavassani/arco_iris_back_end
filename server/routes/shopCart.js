import { Router } from "express";
import createError from "http-errors";
import controller from "../controller/ShopCart.js"

const shopCartRoutes = new Router()

const verifyId = (request, response, next) => {
    const id = request.params.id
    if(!/[0-9a-f]{24}/.test(id)) {
        return next(createError(422, 'id invalido'))
    }

    next()
}

shopCartRoutes.post("/", controller.addItemToCart)
shopCartRoutes.get("/", controller.getCart)
shopCartRoutes.delete("/delete-cart",  controller.emptyCart)

export default shopCartRoutes