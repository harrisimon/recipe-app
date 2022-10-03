const mongoose = require("mongoose")

const { Schema, model } = mongoose

//recipe schema
const recipeSchema = new Schema({
    name: String,
    ingredientOne: {
        name: String,
        amount: Number
    },
    ingredientTwo: {
        name: String,
        amount: Number
    },
    isNaturallyGF: Boolean
})

const Recipe = model('Recipe', recipeSchema)


module.exports = Recipe