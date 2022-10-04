/////////////////////////////////
// Dependencies ////////////

require("dotenv").config() // Load ENV Variables
const express = require("express") // import express

const path = require("path") // import path module
const morgan = require("morgan") // import morgan
const middleware = require('./utils/middlware')
const RecipeRouter = require('./controllers/recipeControllers')

// const Recipe = require('./models/recipe')




const app = express()

////////////////////////////////////////
//Middleware
///////////////////////////////////////

middleware(app)


/////////////////////////////////
// Home route
////////////////////////////////

app.get("/", (req, res) => {
    res.send("Your server is running, check the fridge too")
})

app.use('/recipe', RecipeRouter)

//////////////////////////////////
// Server listener
/////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of ${PORT}`))
