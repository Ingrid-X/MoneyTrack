require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const transactionsRoutes = require('./routes/transactions')
//const authRoutes = require('./routes/auth')
//const usersRoutes = require('./routes/users')

// express app
const app = express()

// middlewaare
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/transactions', transactionsRoutes) //ℹ️ grabs all the different routes that we attach to the router
//app.use('/api/auth', authRoutes)
//app.use('/api/users', usersRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI) //ℹ️ asynchronous func, fires a function when i'ts complete or catch any kind of error
 .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port', process.env.PORT)
})
 })
 .catch((error) => {
    console.log(error)
 })



process.env