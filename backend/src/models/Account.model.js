const mongoose = require('mongoose')

const Schema = mongoose.Schema

const accountSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        currency: {
            type: String,
            required: true,
            enum: ["USD", "EUR", "GBP", "MXN", "ARS", "CLP", "BRL", "COP"],
        },
        balance: {
            type: Number,
            default: 0,
            get: (v) => parseFloat(v.toFixed(2)), // rounds to two decimal places
            set: (v) => parseFloat(v.toFixed(2)),
        },
        type: {
            type: String,
            required: true,
            enum: ["cash", "card", "bank"],
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt fields.
        toJSON: { getters: true}, //
        toObject: { getters: true }, // Ensures the getter functions are applied when the document is converted to JSON or an object.
    }
)

module.exports = mongoose.model("Account", accountSchema)