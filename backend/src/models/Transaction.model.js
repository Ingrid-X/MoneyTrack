const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    account: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },

    // Original amount
    amount: {
        type: Number,
        required: true,
        min: 0,
    },

    // Original currency (ej. USD, EUR, ARS)
    currency: {
        type: String,
        required: true,
        uppercase: true,
        minlength: 3,
        maxlength: 3,
    },

    // Type of transaction: income or expense
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true,
    },

    category: {
        type: String,
        trim: true,
        default: "General",
    },

    date: {
        type: Date,
        default: Date.now,
    },

    notes: {
        type: String,
        trim: true,
        maxlength: 200,
    },

    // Keeps the conversion (ej. from ARS to USD)
    conversion: {
        toCurrency: { type: String, uppercase: true, minlength: 3, maxlength: 3 },
        rate: { type: Number },
        convertedAmount: { type: Number },
        date: { type: Date },
    },
},
{
    timestamps: true, // adds createdAt and updatedAt automatically
},
)

// 
transactionSchema.index({ user: 1, date: -1 })
transactionSchema.index({ category: 1 })
transactionSchema.index({ currency: 1})

// Auxiliar method example
transactionSchema.methods.getFormattedAmount = function () {
    return `${this.amount.toFixed(2)} ${this.currency}`
}

module.exports = mongoose.model("Transaction", transactionSchema)