const express = require('express')
const Transaction = require('../models/Transaction.model')
const { createTransaction,
    getTransaction,
    getTransactions,
    deleteTransaction,
    updateTransaction
} = require('../controllers/transaction.controller')

const router = express.Router()


//GET all transactions
router.get('/', getTransactions)

// GET a single transaction
router.get('/:id', getTransaction)

// POST a new transaction
router.post('/', createTransaction)

// DELETE a transaction
router.delete('/:id', deleteTransaction)

// UPDATE a transaction
router.patch('/:id', updateTransaction)

module.exports = router