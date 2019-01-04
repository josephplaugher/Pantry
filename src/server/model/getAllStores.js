const dbConn = require('../util/postgres');

GetAllStores = (req, res) => {
  dbConn.query('SELECT store, id FROM stores ORDER BY store ASC')
      .then(data => {
        res.status(200).json({ table: data.rows });}) 
      .catch(e => console.error(e.stack))
}

module.exports = GetAllStores;