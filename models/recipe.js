const mongoose = require("mongoose")
const User = require('./user')
//import rating schema

const { Schema, model } = mongoose

//recipe schema
const ingredientSchema = new Schema({
    name: String,
    amount: Number,
    measurement: String

})
const recipeSchema = new Schema({
    name: String,
    ingredients: [ingredientSchema],
    isNaturallyGF: Boolean,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true})


const Recipe = model('Recipe', recipeSchema)


module.exports = Recipe
