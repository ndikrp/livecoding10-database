require('dotenv').config()
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT;

const DB = process.env.DATABASE

mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(con => {
    console.log("Koneksi ke database sukses!")
});

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

const customerTest = new Customer({
    name: 'hadi',
    email: 'yogacintadia5@gmail.com',
    phoneNumber: '0412556215'
})

customerTest.save().then(doc => {
    console.log(doc)
}).catch(err => {
    console.log('Error: ' + err)
})

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
});