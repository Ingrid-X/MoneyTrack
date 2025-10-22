const express = require('express')
const Transaction = require('../models/Transaction.model')

const router = express.Router()


//GET all transactions
router.get('/', (req, res) => {
    res.json({mssg: 'GET all transactions'})
})

// GET a single transaction
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single transaction'})
})

// POST a new transaction
router.post('/', async(req, res) => {
    const {user, account, amount, currency, type, category, date, notes, conversion} = req.body

    try {
        // Creates a new document for us with those properties
        const transaction = await Transaction.create({user, account, amount, currency, type, category, date, notes, conversion}) 
        res.status(200).json(transaction)
    } catch (error){
        res.status(400).json({error: error.message})
    }

    res.json({mssg: 'POST a new transaction'})
})

// DELETE a transaction
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a transaction'})
})

// UPDATE a transaction
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a transaction'})
})

module.exports = router