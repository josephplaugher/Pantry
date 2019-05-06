const dbConn = require('../../util/postgres')

RemoveFromList = (req, res) => {
	const query = {
		text: `UPDATE inventory 
      SET shoppinglist = 0 
      WHERE id = $1`,
		values: [req.params.id]
	}
	dbConn
		.query(query)
		.then((data) => {
			res.status(200).json({ success: true })
		})
		.catch((e) => console.error(e.stack))
}

module.exports = RemoveFromList
