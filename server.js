require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") // import morgan
const path = require("path") // import path module


const Recipe = require('./models/recipe')




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



//////////////////////////////////
// Server listener
/////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of ${PORT}`))
