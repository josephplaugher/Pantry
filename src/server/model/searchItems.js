const dbConn = require('./../util/postgres');

SearchItems = (req, res) => {
  const query = {
    "text": `SELECT item, description, units, store, storage 
      FROM inventory
      WHERE LOWER(item) LIKE LOWER($1) 
      OR LOWER(description) LIKE LOWER($2)
      OR LOWER(store) LIKE LOWER($3) 
      OR CAST(units AS TEXT) LIKE LOWER($4)
      OR LOWER(storage) LIKE LOWER($5)
    ORDER BY item ASC`,
    "values": [req.body.item,
                req.body.description,
                req.body.units,
                req.body.store,
                req.body.storage
              ]
  }
  dbConn.query(query)
      .then(data => res.status(200).json({ table: data.rows }))
      .catch(e => console.error(e.stack))
}

module.exports = SearchItems;