const db = require('../../Config/db');

module.exports = {
  createCatagory : (catagory) =>db('catagory').insert(catagory),
  getCatagory : () =>db('catagory').select('*')
};