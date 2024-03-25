const fs = require('fs')
const Customer = require('./../models/customerModel')

const getCustomerData = async (req, res) => {
    try {
        const queryObject = {...req.query}
        const excludedColumn = ['page', 'sort', 'limit', 'fields']
        excludedColumn.forEach(el => delete queryObject[el])

        console.log(req.query, queryObject)

        const customers = await Customer.find(queryObject)

        res.status(200).json({
            status: 'Success',
            totalData: customers.length,
            requestAt: req.requestTime,
            data: {
                customers
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}


const getCustomerbyId = async (req, res) => {
    try {
        const id = req.params.id
        const customer = await Customer.findById(id)
        res.status(200).json({
            status: 'Success',
            data: {
                customer
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

const insertUser = async (req, res) => {
    try {
        const newCustomer = await Customer.create(req.body)

        res.status(201).json({
            status: 'Success',
            data: {
                customers: newCustomer,
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id

        const customer = await Customer.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        })

        res.status(200).json({
            status: 'Success',
            message: `Berhasil update data ID : ${id}!`,
            data: {
                customer,
            },
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status: 'Success',
            message: `Berhasil hapus data ID : ${req.params.id}!`
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

module.exports = {
    getCustomerData,
    getCustomerbyId,
    insertUser,
    updateUser,
    deleteUser,
}