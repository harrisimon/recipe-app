// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Recipe = require("../models/recipe")

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()


/////////////////////////////////////////
// POST / only loggedIn users can post ratings
router.post('/:recipeId', (req, res) => {
    const recipeId = req.params.recipeId

    if(req.session.loggedIn){
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    Recipe.findById(recipeId)
        .then(recipe => {
            recipe.rating.push(req.body)
            return recipe.save()
        })
        .then(recipe => {
            res.redirect(`/recipes/${recipe.id}`)
            // res.status(200).json({recipe: recipe})
        })
        // .catch(error => console.log(error))
        .catch(err => res.redirect(`/error?error=${err}`))

})

// DELETE
// only the author of the rating can delete it

router.delete('/delete/:recipeId/:ratingId', (req, res) => {
    const recipeId = req.params.recipeId
    const ratingId = req.params.ratingId

    Recipe.findById(recipeId)
        .then(recipe => {
            const rating = recipe.rating.id(ratingId)
            console.log('rating', rating)

            if (req.session.loggedIn){

                if(rating.author == req.session.userId){
                    rating.remove()
                    recipe.save()
                    // res.sendStatus(204)
                    res.redirect(`/recipes/${recipe.id}`)
                } else {
                    res.sendStatus(401)
                }
            } else {
                // res.sendStatus(401)
                const err = 'you%20are%20not%20authorized%20for%20this%20action'
                res.redirect(`/error?error=${err}`)
            }

        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

module.exports = router
