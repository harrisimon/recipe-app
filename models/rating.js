const mongoose = require("mongoose")

const ratingSchema = new mongoose.Schema({
    stars : {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

module.exports = ratingSchema