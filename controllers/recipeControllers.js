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
router.get("/", (req, res) => {
    // console.log("this is the request", req)
    // in our index route, we want to use mongoose model methods to get our data
    Recipe.find({})
        .populate("rating.author", "username")
        .then(recipe => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            console.log(recipe)
            res.render('recipes/index', { recipe, username, loggedIn, userId })
        })
        .catch(err => console.log(err))
})

// GET for new recipe
// Render form to create a fruit
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    res.render('recipes/new', { username, loggedIn, userId })
})

// POST request
router.post("/", (req, res) => {
    req.body.owner = req.session.userId
    // console.log("this is the req.body before adding an owner'", req.body)
    Recipe.create(req.body)

        .then(recipe => {
            res.status(201).json({recipe: recipe.toObject()})
        })
        .catch(error => console.log(error))
})

// GET request
// only recipes logged by user
router.get('/mine', (req, res) => {
    Recipe.find({owner: req.session.userId})
        .then(recipe => {
            res.status(200).json({recipe: recipe})
        })
        .catch(error => res.json(error))
})

// PUT request
router.put("/:id", (req, res) => {
    const id = req.params.id
    Recipe.findById(id)
    .then(recipe => {
        if(recipe.owner == req.session.userId){
            console.log('the recipe from update', recipe)
            res.sendStatus(204)
            return recipe.updateOne(req.body)
        } else {
            res.sendStatus(401)
        } 
        })
        .catch(err => console.log(err))
})

// DELETE request
router.delete("/:id", (req, res) => {
    const id = req.params.id
    // Recipe.findByIdAndDelete(id)
    //if sucessful 
    Recipe.findById(id)
        .then(recipe => {
            if(recipe.owner == req.session.userId){
                res.sendStatus(204)
                return recipe.deleteOne()
            } else {
                res.sendStatus(401)
            }
        })
        .catch(err => res.json(err))
})

//SHOW request
router.get("/:id", (req, res) => {
    const id = req.params.id
    Recipe.findById(id)
        .populate("rating.author", "username")
        .then(recipe => {
            res.json({recipe: recipe})
        })
        .catch(err => console.log(err))
})
/////////////////////////////////////////////
// Export the router
/////////////////////////////////////////////
module.exports = router