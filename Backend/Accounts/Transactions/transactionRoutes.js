const { createTransaction, getTransaction } = require('./transactionController')



const router = require('express').Router()

module.exports = (app) => {
    
    router.post('/createtransaction',createTransaction)
    router.get('/gettransactions',getTransaction)

    return app.use('/api/accounts/transaction', router)
}