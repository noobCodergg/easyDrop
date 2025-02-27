
const { createTransaction, getTransaction, updateTransaction, getSummary } = require('./transactionController')



const router = require('express').Router()

module.exports = (app) => {
    
    router.post('/createtransaction',createTransaction)
    router.get('/gettransactions',getTransaction)
    router.put('/updatetransaction/:id',updateTransaction)
    router.get('/getsummary',getSummary)
    return app.use('/api/accounts/transaction', router)
}