const mongoose = require('mongoose')
const clientSchema = mongoose.Schema({

    image: {
        type: String,
        required: true
    }
})
clientSchema.methods.toJSON = function () {
    const client = this
    const clientObj = client.toObject()
    return clientObj
}
const Client = mongoose.model('clients', clientSchema)
module.exports = Client