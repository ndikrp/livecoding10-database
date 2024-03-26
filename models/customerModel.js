const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name must be filled!']
    },
    age: Number,
    email: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    password: {
        type: String,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    
})
const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer