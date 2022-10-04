////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Recipe = require("../models/recipe")

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
/////////////////////////////////////////////

// GET request
router.get("/recipes", (req, res) => {
    Recipe.find({})
    .then(recipe => {
        res.json({recipe: recipe})
    })
    .catch(err => console.log(err))
})

// POST request
router.post("/recipes", (req, res) => {
    Recipe.create(req.body)
        .then(recipe => {
            res.status(201).json({recipe: recipe.toObject()})
        })
        .catch(error => console.log(error))
})

// PUT request
router.put("/recipes/:id", (req, res) => {
    const id = req.params.id

    Recipe.findByIdAndUpdate(id, req.body, {new: true})
        .then(recipe => {
            console.log("updated recipe", recipe)
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})

// DELETE request
router.delete("/recipes/:id", (req, res) => {
    const id = req.params.id
    Recipe.findByIdAndDelete(id)
    //if sucessful 
        .then(recipe => {
            res.sendStatus(204)
        })
        .catch(err => res.json(err))
})

//SHOW request
router.get("/recipes/:id", (req, res) => {
    const id = req.params.id
    Recipe.findById(id)
        .then(recipe => {
            res.json({recipe: recipe})
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})
/////////////////////////////////////////////
// Export the router
/////////////////////////////////////////////
module.exports = router