////////////////////////////////////////
// Dependencies

const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

/////////////////////////////////////////
// Create Router
const router = express.Router()

/////////////////////////////////

//GET route for sign up
// renders the signup page
router.get('/signup', (req, res) => {
    res.render('users/signup')
})


// sign up route
router.post('/signup', async (req, res) => {
    console.log('initial req.body', req.body)

    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )
    console.log('req after has', req.body)

    User.create(req.body)
        .then(user => {
            // console.log(user)
            // res.status(201).json({username: user.username})
            res.redirect('/users/login')
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

// renders the login page
router.get('/login', (req, res) => {
    res.render('users/login')
})


//////////////////////////////////
// login route
router.post('/login', async (req, res) => {
    const {username, password} = req.body
    User.findOne({username})
        .then(async (user) => {
            if (user){
                const result = await bcrypt.compare(password, user.password)

                if (result){
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user.id
                    console.log('req.session', req.session)
                    // res.status(201).json({user: user.toObject()})
                    res.redirect('/recipes')
                } else {
                    res.json({error: 'username or password incorrect'})
                }
            } else {
                res.json({error: 'user does not exist'})
            }
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

// GET
// SENDS to the logout page
router.get('/logout', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    res.render('users/logout', { username, loggedIn, userId})
})

// DELETE -> runs the logout
// /users/logout
// a route for log out 
router.delete('/logout', (req, res) => {
    // destroy the session(eventually we'll redirect)
    req.session.destroy(err => {
        console.log('req.session after logout', req.session)
        console.log('err on logout?', err)

        // res.sendStatus(204)
        res.redirect('/')
    })
})
/////////////////////////////////
/// export user router
module.exports = router