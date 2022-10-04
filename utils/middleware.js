/////////////////////////////////////////////
// Dependencies
require("dotenv").config() // Load ENV Variables
const morgan = require('morgan') // import morgan
const express = require('express') // import 
const session = require('express-session')
const MongoStore = require('connect-mongo')

/////////////////////////////////////////////
// Middleware function
const middleware = (app) => {
    app.use(morgan('tiny')) // This is for reqest logging, the 'tiny' argument declares what size of morgan log to use.
    app.use(express.urlencoded({extended: true})) // this parses urlEncoded request bodies (useful for POST and PUT requests)
    app.use(express.static('public')) //serves files from the public folder statically
    app.use(express.json()) // this parses incoming request payloads with JSON
    //we need to set up a session function and pass that function an object as the argument, that argument object will tell express session how to build our session
    app.use(
        session({
            secret: process.env.SECRET,
            store: MongoStore.create({
                mongoUrl: process.env.DATABASE_URL
            }),
            saveUninitialized: true,
            resave: false
        })
    )
}

/////////////////////////////////////////////
// Middleware export
module.exports = middleware