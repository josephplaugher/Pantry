const dbConn = require('../../util/postgres')

NewStore = (req, res) => {
	const query = {
		text: `INSERT INTO stores (store) VALUES ($1)`,
		values: [req.body.store]
	}
	dbConn
		.query(query)
		.then((data) =>
			res
				.status(200)
				.json({
					success: true,
					userNotify: { success: 'Store Added Successfully' }
				})
		)
		.catch((e) => console.error(e.stack))
}

module.exports = NewStore
