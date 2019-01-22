const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const getAllItems = require('./model/getAllItems');
const getShoppingList = require('./model/getShoppingList');
const markPurchased = require('./model/markPurchased')
const removeFromList = require('./model/removeFromList');
const getAllStores = require('./model/getAllStores');
const newItem = require('./model/newItem');
const newStore = require('./model/newStore');
const searchItems = require('./model/searchItems');
const useItem = require('./model/useItem');
const LiveSearch = require('./model/liveSearch');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');

let port = process.env.PORT;
app.listen(port, function(){
  console.log('server started in '+ process.env.NODE_ENV + ' mode on port ' + port);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.BASE_URL);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.set("X-Powered-By", "Maleries Pantry");
  next();
});

app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
app.use(cookieParser());
app.use(bodyParser.json()); // Parse application/json

//login route does not require a cookie or token
//not using a login for now. No sensitive data.
/*
app.post('/login', (req, res) => {
  const Login = new login(req, res);
  Login.getUserData();
});

app.get('/checkLoginState', Auth, (req, res) => {
  res.status(200).json({checkLoginState: 'done'});
});
*/

app.get('/getAllItems',  getAllItems);
app.get('/getShoppingList',  getShoppingList);
app.post('/markPurchased', markPurchased);
app.get('/removeFromList/:id',  removeFromList);
app.get('/getAllStores',  getAllStores);
app.post('/searchItems', searchItems);
app.post('/newItem', newItem);
app.post('/newStore', newStore);
app.post('/useItem', (req, res) => {
  const UseItem = new useItem(req, res);
  UseItem.updateInv();
});
app.get('/liveSearch/name/:name/value/:value', (req, res) => {
  const LS = new LiveSearch(req, res);
  LS.Run();
});
//this route renders the UI. The UI will check for the cookie and token
//and log the user out if they don't exist.
app.all('/*', (req, res) => {
  res.render('index');
});