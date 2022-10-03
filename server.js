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