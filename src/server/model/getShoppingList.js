const dbConn = require('../util/postgres');

GetShoppingList = (req, res) => {
  dbConn.query(`SELECT 
  id, item, store, instore_location, shoppinglist 
  FROM inventory 
  WHERE shoppinglist > 0
  ORDER BY store ASC, instore_location ASC`)
      .then(data => {
        res.status(200).json({ table: data.rows });}) 
      .catch(e => console.error(e.stack))
}

module.exports = GetShoppingList;