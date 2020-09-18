import React from 'react';
import logo from './assets/logo_mp.png';
import './App.scss';

import Irregularities from './pages/Irregularities/Irregularities'
import BiddingDetails from './pages/BiddingDetails/BiddingDetails'
import BidderDetails from './pages/BidderDetails/BidderDetails'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">

      <nav className="header">
          <img src={logo} alt="Ministério Público" width="114" height="40" />
      </nav>


      <Router>

        <main>

          <Switch>

            <Route exact path="/">
              <Irregularities />
            </Route>

            <Route path="/details">
              <BiddingDetails />
            </Route>

            <Route path="/bidder-details">
              <BidderDetails />
            </Route>


          </Switch>
          
        </main>

      </Router>
    </div>
  );
}

export default App;
