const dbConn = require('../../util/postgres')

MarkPurchased = (req, res) => {
	const query = {
		text: `UPDATE inventory 
      SET instock = instock + $1,
          shoppinglist = 0
      WHERE id = $2`,
		values: [req.body.quantity, req.body.id]
	}
	dbConn
		.query(query)
		.then((data) => {
			res
				.status(200)
				.json({ success: true, userNotify: 'Item Purchased Successfully' })
		})
		.catch((e) => console.error(e.stack))
}

module.exports = MarkPurchased
