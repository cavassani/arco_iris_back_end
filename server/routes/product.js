import { Router } from 'express'
import createError  from 'http-errors'
import controller from '../controller/Product.js'

const productRoutes = new Router()
const verifyId = (request, response, next) => {
    const id = request.params.id
    if(!/[0-9a-f]{24}/.test(id)) {
        return next(createError(422, 'id invalido'))
    }

    next()
}
productRoutes.get('/', controller.list)
productRoutes.get('/:id',verifyId,  controller.byId)
productRoutes.post('/', controller.create)
productRoutes.put('/:id', verifyId, controller.updateById)
productRoutes.delete('/:id', verifyId, controller.deleteById)


export default productRoutes