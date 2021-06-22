import './App.scss';
import Home from './pages/home';
import Case from './pages/case';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>

        <Route path="/case/:caseId">
          <Case />
        </Route>

        <Route path="/">
          <Home />
        </Route>
        
      </Switch>
    </Router>
  );
}

export default App;
