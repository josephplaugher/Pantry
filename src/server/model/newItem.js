const BaseObject = require('./../util/BaseObject');
const dbConn = require('./../util/postgres');

function NewItem(req, res) {
  BaseObject.apply(this, arguments);
  this.inputs = req.body;
  this.res = res;
  this.req = req;
}

NewItem.prototype = BaseObject.prototype;
NewItem.prototype.constructor = BaseObject;

NewItem.prototype.preprocess = function() {
  const req = this.req;
  const query = {
    "text": `INSERT INTO inventory (item, description, units, store, storage) 
      VALUES ($1,$2,$3,$4,$5)`,
    "values": [req.body.item,
                req.body.description,
                req.body.units,
                req.body.store,
                req.body.storage
              ]
  }
  dbConn.query(query)
      .then(data => {
        this.respond(this.res, '', true, 'Item Added Successfully')
      })
      .catch(e => {
        this.respond(this.res, e, true, 'Something went wrong, ask Joe')
        console.error(e.stack)
      })
}

module.exports = NewItem;