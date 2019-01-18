const dbConn = require('../util/postgres');

function LiveSearch(req, res) {
    this.name = req.params.name;
    this.val = req.params.value;
    this.res = res;
}

LiveSearch.prototype.Run = function() {
    console.log('name', this.name, 'val', this.val)
    let query = this.setQuery(this.name, this.val);    
    this.runQuery(query, this.val); 
}

LiveSearch.prototype.setQuery = function(name, val) {
    var query;
    switch(name) {
        case 'item':  
            query = "SELECT id, item FROM inventory WHERE LOWER(item) LIKE LOWER($1) LIMIT 5";
        break;

        case 'store':
            query = "SELECT id, store FROM stores WHERE LOWER(store) LIKE LOWER($1) LIMIT 5";
        break;

        default:
            query = 'no match';
            break;
    }
    return query;
}


LiveSearch.prototype.runQuery = function (sql, val) {
    const param = '%' + val + '%';
    const query = {
        "text": sql,
        "values": [param],
    }
    dbConn.query(query)
        .then(data => {
            if (data.rows[0]) {
                this.res.status(200).json({ lsrResult: data.rows })
            }
            if (!data.rows[0]) {
                this.res.status(200).json({ noResult: [{id: 0, res:'Nothing found'}]})
            }
        })
        .catch(error => console.error(error.message))
}

module.exports = LiveSearch;