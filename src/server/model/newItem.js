const dbConn = require('../util/postgres');

NewItem = (req, res) => {
  const query = {
    "text": `INSERT INTO inventory 
    (item, brand, description, units, store, storage, par, instock, shoppinglist, instore_location) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,0,$9)`,
    "values": [req.body.item,
                req.body.brand, 
                req.body.description,
                req.body.units,
                req.body.store,
                req.body.storage,
                req.body.par,
                req.body.instock,
                req.body.instore_location
              ]
  }
  dbConn.query(query)
      .then(data => res.status(200).json({ success: true, userNotify: {success:'Item Added Successfully' }}))
      .catch(e => console.error(e.stack))
}

module.exports = NewItem;