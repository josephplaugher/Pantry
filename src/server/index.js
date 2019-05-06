const dotenv = require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const SetUrl = require('./util/SetUrl')
const cookieParser = require('cookie-parser')
const Auth = require('./util/Auth')
const login = require('./model/users/login')
const logout = require('./model/users/logout')
const getAllItems = require('./model/pantry/getAllItems')
const getShoppingList = require('./model/pantry/getShoppingList')
const markPurchased = require('./model/pantry/markPurchased')
const removeFromList = require('./model/pantry/removeFromList')
const addToList = require('./model/pantry/addToList')
const getAllStores = require('./model/pantry/getAllStores')
const newItem = require('./model/pantry/newItem')
const newStore = require('./model/pantry/newStore')
const searchItems = require('./model/pantry/searchItems')
const useItem = require('./model/pantry/useItem')
const LiveSearch = require('./model/pantry/liveSearch')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', './src/views')

let port = process.env.PORT
app.listen(port, function() {
	console.log(
		'server started in ' + process.env.NODE_ENV + ' mode on port ' + port
	)
})

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', SetUrl())
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-Type, authorization')
	res.set('X-Powered-By', 'Maleries Pantry')
	next()
})

app.use(bodyParser.urlencoded({ extended: false })) // Parse application/x-www-form-urlencoded
app.use(cookieParser())
app.use(bodyParser.json()) // Parse application/json

const checkAuth = (req, res, next) => {
	let auth = new Auth(req, res, next)
	return auth
}

//login route does not require a cookie or token
app.post('/login', (req, res) => {
	const Login = new login(req, res)
	Login.start()
})
app.get('/user/logout', logout)

app.get('/checkLoginState', checkAuth, (req, res) => {
	res.status(200).json({ checkLoginState: 'done' })
})

app.get('/getAllItems', getAllItems)
app.get('/getShoppingList', getShoppingList)
app.post('/markPurchased', markPurchased)
app.get('/removeFromList/:id', removeFromList)
app.post('/addToList', addToList)
app.get('/getAllStores', getAllStores)
app.post('/searchItems', searchItems)
app.post('/newItem', newItem)
app.post('/newStore', newStore)
app.post('/useItem', (req, res) => {
	const UseItem = new useItem(req, res)
	UseItem.updateInv()
})
app.get('/liveSearch/name/:name/value/:value', (req, res) => {
	const LS = new LiveSearch(req, res)
	LS.Run()
})
//this route renders the UI. The UI will check for the cookie and token
//and log the user out if they don't exist.
app.all('/*', (req, res) => {
	res.render('index')
})
