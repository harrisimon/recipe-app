/////////////////////////////////////
// User Schema and model

//////////////////////////
// Dependencies
const mongoose = require("./connection")

const { Schema, model } = mongoose

///////////////////////////////////
/// Define the schema and model

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = model ("User", userSchema)

//////// Export the model
module.exports = User