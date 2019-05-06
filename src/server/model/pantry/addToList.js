const dbConn = require('../../util/postgres')

AddToList = (req, res) => {
	const query = {
		text: `UPDATE inventory 
      SET shoppinglist = shoppinglist + $1 
      WHERE id = $2`,
		values: [req.body.quantity, req.body.id]
	}
	dbConn
		.query(query)
		.then((data) =>
			res
				.status(200)
				.json({ success: true, userNotify: 'Added to Shopping List' })
		)
		.catch((e) => console.error(e.stack))
}

module.exports = AddToList
