import repository from '../repository/Product.js'
import createError from 'http-errors'

const handleNotFound = (result) => {
    if(!result) {
        throw createError(404, 'Produto não encontrado!!')
    }
    return result
}

const Product = {
    list(request, response, next) {
        const {q, page} = request.query
        repository.list(q, page)
        .then(result => response.json(result))
        .catch(next)
    },
   /*  async byId(request,response, next) {
        const id = request.params.id
        
       try {
           const result = await repository.byId(id)
           .then(handleNotFound)
            response.json(result)
       } catch(e) {
           next(e)
       }
    }, */
    byId(request, response, next) {
        repository.byId(request.params.id)
        .then(handleNotFound)
        .then(result => response.json(result))
        .catch(next)
    },
    upload(request,response,next) {
        const images = request.files
        let data = repository.upload(images)

        response.status(201).json({
            images: data
        })
    },
    create(request,response,next) {
        repository.create(request.body)
        .then(result => response.status(201).json(result))
        .catch(next)
    },
    updateById(request,response,next) {
        repository.updateById(request.params.id, request.body)
        .then(result => response.json(result))
        .catch(next)
    },
    deleteById(request,response,next) {
        repository.deleteById(request.params.id)
        .then(_=> response.sendStatus(204))
        .catch(next)
    }
}

export default Product