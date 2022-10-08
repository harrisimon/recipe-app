/////////////////////////////////
// Dependencies ////////////

require("dotenv").config() // Load ENV Variables
const express = require("express") // import express

const path = require("path") // import path module
const RecipeRouter = require('./controllers/recipeControllers')
const UserRouter = require('./controllers/userControllers')
const RatingRouter = require('./controllers/ratingControllers')
const middleware = require('./utils/middleware')


///////////////////////
// Express object
const app = require("liquid-express-views")(express())

////////////////////////////////////////
//Middleware
///////////////////////////////////////
middleware(app)


/////////////////////////////////
// Home route
////////////////////////////////

app.get("/", (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/recipes')
    } else {
        res.render('index.liquid')
    }
})

app.use('/recipes', RecipeRouter)
app.use('/users', UserRouter)


//////////////////////////////////
// Server listener
/////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of ${PORT}`))
