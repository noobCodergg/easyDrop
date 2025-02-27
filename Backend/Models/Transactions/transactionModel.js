const db=require('../../Config/db')

module.exports = {
  createTransaction: (transaction) => db('transactions').insert(transaction),
  getTransactions: () => db('transactions').select('*'),
};
