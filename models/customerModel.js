const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name must be filled!']
    },
    email: {
        type: String,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    city: String,
    country: {
        type: String,
        required: true,
        default: "Indonesia"
    }
})
const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer