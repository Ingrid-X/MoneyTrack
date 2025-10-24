const Transaction = require('../models/Transaction.model')
const mongoose = require('mongoose')


// get all transactions
const getTransactions = async (req, res) => {
    // lists all transactions in a descending order (newer ones at the top)
    const transaction = await Transaction.find({}).sort({createdAt: -1}) 

    res.status(200).json(transaction)
}

// get a single transaction
const getTransaction = async (req, res) => {
    // finds a single transaction 
    const {id} = req.params // grabs the id property from the route params

    // If the id isn't valid it's going to return a response with a error mssg.
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Transaction'})
    }

    const transaction = await Transaction.findById(id)
    if (!transaction) {
        return res.status(400). json({error: 'No such Transaction'})
    }

    res.status(200).json(transaction)
}

// create a new transaction
const createTransaction = async (req, res) => {
    const {user, account, amount, currency, type, category, date, notes, conversion} = req.body

    // add doc to db
    try {
        // Creates a new document for us with those properties
        const transaction = await Transaction.create({user, account, amount, currency, type, category, date, notes, conversion}) 
        res.status(200).json(transaction)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// delete a transaction
const deleteTransaction = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Transaction'})
    }

    // finds the _id (on the db) equal to the id we have
    const transaction = await Transaction.findOneAndDelete({_id: id})

    if (!transaction) {
        return res.status(400). json({error: 'No such Transaction'})
    }

    return res.status(200).json(transaction)
}

// update a transaction

const updateTransaction = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(404).json({error: 'No such Transaction'})
    }

    // 2nd param represents the updates we want to make
    const transaction = await Transaction.findOneAndUpdate({_id: id}, {
        ...req.body // whatever properties are on the body it's going to output those in this update Object
    })

     if (!transaction) {
        return res.status(400). json({error: 'No such Transaction'})
    }

    return res.status(200).json(transaction)
}

module.exports = {
    getTransactions,
    getTransaction,
    createTransaction,
    deleteTransaction,
    updateTransaction
}