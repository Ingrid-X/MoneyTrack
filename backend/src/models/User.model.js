const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true, // creates a unique index
            lowercase: true, // emails are stored in lowercase
            trim: true,
        },

        passwordHash: {
            type: String,
            required: true,
        },

        defaultCurrency: {
            type: String,
            default: "USD",
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },

    {
        // Converts Schema to JSON and includes virtuals & getters
        toJSON: { virtuals: true },
        toObject: {virtuals: true },
    }
)

module.exports = mongoose.model("User", userSchema)