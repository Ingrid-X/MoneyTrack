const express = require('express')

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
router.post('/', (req, res) => {
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