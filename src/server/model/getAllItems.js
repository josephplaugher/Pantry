const dbConn = require('./../util/postgres');

GetAllItems = (req, res) => {
  dbConn.query('SELECT id, item, description, units, store, storage, par, instock, shoppinglist FROM inventory ORDER BY item ASC')
      .then(data => {
        res.status(200).json({ table: data.rows });}) 
      .catch(e => console.error(e.stack))
}

module.exports = GetAllItems;