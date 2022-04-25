import mongoose from "../config/mongoose.js"
import schema from '../schema/Product.js'

const model = mongoose.model('Product', schema)

const Product = {
    list() {
       const query = {}
       return model.find(query)
    },
    byId(id) {
        return model.findOne({ _id: id })
    },
    upload(data) {
        const images = data.map((image) => {return image.path.replace(/public/g, '')})
        return images
    },
    create(data) {
        const product = new model(data)
        return product.save()
    },
    updateById(id, data) {
        return model.updateOne({ _id: id }, data)
    },
    deleteById(id) {
        return model.deleteOne({ _id: id })
    },
}

export default Product