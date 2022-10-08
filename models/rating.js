const mongoose = require("mongoose")

const {Schema}= mongoose
const ratingSchema = new Schema({
    stars : {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

module.exports = ratingSchema