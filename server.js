require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") // import morgan
const mongoose = require("mongoose") // import mongoose
const path = require("path") // import path module


const Recipe = require('./models/recipe')


const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
    .on("open", () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconnected from Mongoose'))
    .on('error', (error) => console.log("An error occured: \n", error))

const app = express()

////////////////////////////////////////
//Middleware
///////////////////////////////////////

app.use(morgan("tiny"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(express.json())


/////////////////////////////////
// ROUTES aka where I get my kicks
////////////////////////////////


app.get("/", (req, res) => {
    res.send("Your server is running, check the fridge too")
})

// SEED route
app.get("/recipes/seed", (req, res) => {
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
app.get("/recipes", (req, res) => {
    Recipe.find({})
    .then(recipe => {
        res.json({recipe: recipe})
    })
    .catch(err => console.log(err))
})

// POST request
app.post("/recipes", (req, res) => {
    Recipe.create(req.body)
        .then(recipe => {
            res.status(201).json({recipe: recipe.toObject()})
        })
        .catch(error => console.log(error))
})

// PUT request
app.put("/recipes/:id", (req, res) => {
    const id = req.params.id

    Recipe.findByIdAndUpdate(id, req.body, {new: true})
        .then(recipe => {
            console.log("updated recipe", recipe)
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})

// DELETE request
app.delete("/recipes/:id", (req, res) => {
    const id = req.params.id
    Recipe.findByIdAndDelete(id)
    //if sucessful 
        .then(recipe => {
            res.sendStatus(204)
        })
        .catch(err => res.json(err))
})

//SHOW request
app.get("/recipes/:id", (req, res) => {
    const id = req.params.id
    Recipe.findById(id)
        .then(recipe => {
            res.json({recipe: recipe})
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})

//////////////////////////////////
// Server listener
/////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of ${PORT}`))
