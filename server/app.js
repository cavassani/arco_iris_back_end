//importando e isntanciando o express
import express from 'express'
import routes from './routes/index.js'
import Home from './controller/Home.js'
import AppController from './controller/App.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(routes)
// app.use(AppController.notFound)
// app.use(AppController.handleError)

//liberaqr CORS
app.use((request,response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

// app.use((request, response, next) => {
//     var err = new Error('Not Found')
//     err.status = 404
//     next(err)
// })

//sempre o ultimo da cadeia, middleware de erros
// app.use((err, request, response, next) =>{
//     if(err.status !== 404) console.log(err.stack)
//     response.status(err.status|| 500).json({ err: err.message})
// })
//porta do servidor
export default app