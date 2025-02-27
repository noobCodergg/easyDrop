const { createCatagory, getCatagory } = require('./CatagoryController')





const router = require('express').Router()

module.exports = (app) => {
    
    router.post('/createcatagory',createCatagory)
    router.get('/getcatagory',getCatagory)

    return app.use('/api/accounts/catagory', router)
}