require('dotenv').config()
const mongoose = require('mongoose')
const fs = require('fs')
const Customer = require('../models/customerModel')


const DB = process.env.DATABASE

mongoose
    .connect(DB, {
        useNewUrlParser: true,
    })
    .then((con) => {
        console.log("Connection to database success!")
    })

const customer = JSON.parse(fs.readFileSync('./data/customers.json', 'utf-8'))

const importData = async () => {
    try {
        await Customer.create(customer)
        console.log('Data imported!')
    } catch (err) {
        console.log(err)
    }
    process.exit()
}

const clearData = async () => {
    try {
        await Customer.deleteMany()
        console.log('Data deleted!')
        process.exit()
    } catch (err) {
        console.log(err)
    }
}

if (process.argv[2] === '--import') {
    importData()
} else if (process.argv[2] === '--delete') {
    clearData()
}