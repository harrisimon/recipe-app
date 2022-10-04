const mongoose = require("mongoose")

const { Schema, model } = mongoose

//recipe schema
const ingredientSchema = new Schema({
    name: String,
    amount: Number
})
const recipeSchema = new Schema({
    name: String,
    ingredients: [ingredientSchema],
    isNaturallyGF: Boolean
})


const Recipe = model('Recipe', recipeSchema)


module.exports = Recipe
