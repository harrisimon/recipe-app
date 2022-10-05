const mongoose = require("mongoose")

const ratingSchema = new mongoose.Schema({
    stars : {
        type: Number,
        required: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

module.exports = ratingSchema