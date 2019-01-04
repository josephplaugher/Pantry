import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
//import User from './User'
import NewItem from './NewItem'
import NewStore from './NewStore'
import AllItems from './AllItems'
import AllStores from './AllStores'
import SearchItems from './SearchItems'
import 'css/main.css'
import 'css/logo.css'

const Home = () => (

  <div id="subRoutes">
        <div id="logoBox"><h1>pantry</h1></div>
        {/*<User lname={userData.lname} />*/}
        <Router>
          <div>
        <div id="nav-pane">
               <Link to="/newItem" className="nav">New Item</Link>
          <br/><Link to="/newStore" className="nav">New Grocery Store</Link>
          <br/><Link to="/allItems" className="nav">All Items</Link>
          <br/><Link to="/allStores" className="nav">All Grocery Stores</Link>
          <br/><Link to="/searchItems" className="nav">Search Items</Link>
        </div>
        <div>
        <Route path="/newItem" component={NewItem}/>
        <Route path="/newSTore" component={NewStore}/>
        <Route path="/allItems" component={AllItems}/>
        <Route path="/allStores" component={AllStores}/>
        <Route path="/searchItems" component={SearchItems}/>
       
        </div>
        </div>
        </Router>  
      </div>
    )

export default Home;