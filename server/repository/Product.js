import db from '../../config/mongoist.js'

const Product = {
    list() {
        const query = {}
        return db.products.find(query)
    }
}

export default Product