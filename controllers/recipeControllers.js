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
    req.body.isNaturallyGF = req.body.isNaturallyGF === 'on' ? true : false
    req.body.owner = req.session.userId
    // console.log("this is the req.body before adding an owner'", req.body)
    Recipe.create(req.body)

        .then(recipe => {
            res.redirect('/recipes')
        })
        .catch(error => console.log(error))
})

// GET request
// only recipes logged by user
router.get('/mine', (req, res) => {
    Recipe.find({owner: req.session.userId})
        .then(recipe => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId

            // res.status(200).json({recipe: recipe})
            res.render('recipes/index', {recipe, username, loggedIn, userId})
        })
        .catch(error => res.json(error))
})

// GET request to show the update page
router.get("/edit/:id", (req, res) => {
    // const username = req.session.username
    // const loggedIn = req.session.loggedIn
    // const userId = req.session.userId
    res.send('edit page')
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
router.delete('/:id', (req, res) => {
    // get the fruit id
    const id = req.params.id

    // delete and REDIRECT
    Recipe.findByIdAndRemove(id)
        .then(recipe => {
            // if the delete is successful, send the user back to the index page
            res.redirect('/recipes')
        })
        .catch(error => {
            res.json({ error })
        })
})

//SHOW request
router.get("/:id", (req, res) => {
    const id = req.params.id

    Recipe.findById(id)
        // populate will provide more data about the document that is in the specified collection
        // the first arg is the field to populate
        // the second can specify which parts to keep or which to remove
        // .populate("owner", "username")
        // we can also populate fields of our subdocuments
        .populate("rating.author", "username")
        .then(recipe => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            // res.json({ fruit: fruit })
            res.render('recipes/show', { recipe, username, loggedIn, userId })
        })
        .catch(err => console.log(err))
})
/////////////////////////////////////////////
// Export the router
/////////////////////////////////////////////
module.exports = router