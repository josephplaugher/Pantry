const dbConn = require('./../util/postgres');

function UseItem(req, res) {
  this.req = req;
  this.res = res;
  this.invData = '';
}

//this function updates the inventory with the quantity now in stock after being used
UseItem.prototype.updateInv = function() {
  const req = this.req;
  const query = {
    "text": `UPDATE inventory  
      SET instock = instock - $1
      WHERE id = $2 
      RETURNING id, item, description, units, store, storage, par, instock, shoppinglist`,
    "values": [req.body.units,
                req.body.id
              ]
  }
  dbConn.query(query)
      .then(data => {
        console.log('update inv', data.rows[0])
        this.invData = data.rows[0];
        //then it updates the shopping list
        this.updateShoppingList();
      })
      .catch(e => console.error(e.stack))
}

//this function updates the shopping list by entering or incrementing an amount 
//in the shopping list column for that item
UseItem.prototype.updateShoppingList = function() {
  
  const inv = this.invData;
  console.log('update list running', 'add:',inv.units, 'item id:', inv.id)
  if(inv.instock < inv.par) {
    const query = {
      "text": `UPDATE inventory 
        SET shoppinglist = shoppinglist + $1
        WHERE id = $2 `,
      "values": [inv.units,
                  inv.id
                ]
    }
    dbConn.query(query)
        .then(data => {
          console.log('update list', data)
          //if the query ran, this is the response.
          this.res.status(200).json({ success: true, userNotify: 'Inventory and Shopping List Updated' })
        })
        .catch(e => console.error(e.stack))
  } else {
    //if the query did not run, this is the response.
    this.res.status(200).json({ success: true, userNotify: 'Inventory and Shopping List Updated' })
  }
}

module.exports = UseItem;