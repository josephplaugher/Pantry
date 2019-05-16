const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dbConn = require('../../util/postgres')

function login(req, res) {
	this.req = req
	this.res = res
}

login.prototype.start = function() {
	const query = {
		text:
			'SELECT id, email, lname, fname, password FROM users WHERE email = $1 ',
		values: [this.req.body.email.toLowerCase()]
	}
	dbConn
		.query(query)
		.then((data) => {
			this.checkPassword(this.req, this.res, data.rows[0])
		})
		.catch((e) => console.error(e.stack))
}

login.prototype.checkPassword = function(req, res, userData) {
	if (userData) {
		//if the email resulted in a user entry, compare password hashes
		var dbhash = userData.password
		//if the password was hashed in PHP it will contain a '$2y$' hash.
		//if hashed in Node, it will contain a '$2a$a' hash.
		//if the former, we replace it before verifying.
		if (dbhash.includes('$2y$')) {
			dbhash = dbhash.replace(/^\$2y(.+)$/i, '$2a$1')
		}
		//compaare the hashes
		bcrypt.compare(req.body.password, dbhash, (error, result) => {
			if (error) throw new Error(error)
			else if (result == false) {
				res.status(200).json({
					success: false,
					userNotify: { error: 'That email or password is invalid' }
				})
			} else if (result == true) {
				delete userData.password //ensure the pw hash isn't sent along to the client
				var token = jwt.sign({ userData: userData }, process.env.JWT_SECRET, {
					expiresIn: '1h'
				})
				res.cookie(
					process.env.COOKIE_NAME,
					{ token: token },
					{
						expires: new Date(Date.now() + 60 * 60 * 1000),
						maxAge: 60 * 60 * 1000,
						httpOnly: true,
						secure: process.env.NODE_ENV === 'production'
					}
				)
				res
					.status(200)
					.json({ userNotify: {}, userData: userData, token, token })
			}
		})
	} else {
		//if no matching entry was found, report an error
		res.status(200).json({
			success: false,
			userNotify: { error: 'That email or password is invalid' }
		})
	}
}

module.exports = login
