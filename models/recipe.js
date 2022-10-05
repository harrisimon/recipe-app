const mongoose = require("mongoose")
const User = require('./user')
const { Schema, model } = mongoose
const ratingSchema = require('./rating')

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
    },
    rating: [ratingSchema]
}, { timestamps: true})


const Recipe = model('Recipe', recipeSchema)


module.exports = Recipe
