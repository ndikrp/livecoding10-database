const fs = require('fs')
const Customer = require('./../models/customerModel')

const getCustomerData = async (req, res) => {
    try {
        // 1. Basic Filter
        const queryObject = {...req.query}
        const excludedColumn = ['page', 'sort', 'limit', 'fields']
        excludedColumn.forEach(el => delete queryObject[el])

        console.log(req.query, queryObject)

        // 2. Advanced Filter
        let queryStr = JSON.stringify(queryObject)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        queryStr = JSON.parse(queryStr)
        console.log(req.query)
        
        let query = Customer.find(queryStr)

        // 3. Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            console.log(sortBy)
            query = query.sort(sortBy)
        } else {
            query = query.sort('-createdAt')
        }

        // 4. Field Limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            query = query.select(fields)
        } else {
            query = query.select('-__v')
        }

        // 5. Pagination
        const page = req.query.page * 1 || 1
        const limit = req.query.limit * 1 || 2
        const skip = (page - 1) * limit
        query = query.skip(skip).limit(limit)

        if(req.query.page) {
            const numCustomers = await Customer.countDocuments()
            if (skip > numCustomers) {
                throw new Error('Page not found')
            }
        }

        // Query Execution
        const customers = await query

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