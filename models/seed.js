//////////////////////////////////
// Import dependencies
//////////////////////////////////

const mongoose = require('./connection')
const Recipe = require('./recipe')


//////////////////////////////////
// Seed script code
//////////////////////////////////
const db = mongoose.connection


db.on('open', () => {
    // seed recipes
    const startRecipes = [
        {name: "Nachos",ingredients: [{name: "tortillas",amount: 8}], isNaturallyGF: true },
        {name: "Pizza",ingredients: [{name: "marinara",amount: 5}], isNaturallyGF: false },
    ]
        //delete existing seeds
      Recipe.deleteMany({})
        .then(deletedRecipes => {
            console.log('this is what .remove returns', deletedRecipes)
            Recipe.create(startRecipes)
                .then(data => {
                    console.log('seeded recipes', data)
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    db.close()
                })
        .catch(error => {
            console.log(error)
            db.close(error)
        })
        })
})