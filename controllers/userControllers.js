////////////////////////////////////////
// Dependencies

const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

/////////////////////////////////////////
// Create Router
const router = express.Router()

/////////////////////////////////
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
            console.log(user)
            res.status(201).json({username: user.username})
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
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
                    res.status(201).json({user: user.toObject()})
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

/////////////////////////////
// logout route
router.delete('/logout', (req, res) => {
    req.session.destroy(err => {
        console.log('req session logout', req.session)
        console.log('err on logout', err)
        res.sendStatus(204)
    })
})

/////////////////////////////////
/// export user router
module.exports = router