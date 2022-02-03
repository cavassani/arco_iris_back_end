import { Router } from 'express'
const routes = new Router()

//rotas
routes.get('/', (req,res) => {
    res.send('Olá mundo, sou o app arco iris')
})

// apenas para nao devolver um favicon com erro
routes.use((request, response, next) =>{
    if(request.url ==='/favicon.ico') {
        response.writeHead(200, {'Content-Type': 'image/x-icon'})
        response.end('')
    } else {
        next()
    }
})

export default routes