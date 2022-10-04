////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Recipe = require("../models/fruit")

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
/////////////////////////////////////////////
// SEED route
router.get("/recipes/seed", (req, res) => {
    const startRecipes = [
        {name: "Nachos",ingredients: [{name: "tortillas",amount: 8}], isNaturallyGF: true },
        {name: "Pizza",ingredients: [{name: "marinara",amount: 5}], isNaturallyGF: false },
    ]
    Recipe.deleteMany({})
        .then(() => {
            Recipe.create(startRecipes)
            .then(data => {
                res.json(data)
            })
        })
})

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