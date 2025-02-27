const db = require('../../Config/db');

module.exports = {
  createTransaction: (transaction) => db('transactions').insert(transaction),
  getTransactions: () => db('transactions').select('*'),
  updateTransaction: (id, updatedFields) => db("transactions").where({ id }).update(updatedFields),
  getSummary : () =>db('summary').select('*')
};

