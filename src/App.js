import React from 'react';
import logo from './assets/logo.svg';
import './App.scss';
import AudioListPage from './pages/AudioListPage/AudioListPage';
import AudioDetailPage from './pages/AudioDetailPage/AudioDetailPage';

import EntityListPage from './pages/EntityListPage/EntityListPage';
import EntityDetailPage from './pages/EntityDetailPage/EntityDetailPage';


import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

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

      <nav>
        <div className="row">
          <div className="col-xs">
            <h1>
              <img src={logo} alt="Software de Anotação" />
              Software de Anotação
            </h1>
          </div>
        </div>
      </nav>

      <Router>

        <aside>

          <DropdownButton title="Adicionar">
            <Dropdown.Item href="#/action-1">Transcrição de Áudio</Dropdown.Item>
            <Dropdown.Item href="#/action-1">Detecção de Entidade</Dropdown.Item>
          </DropdownButton>

          <hr />

          <ul>
            <li><NavLink activeClassName="selected" to="/audio-transcription"><i className="fas fa-fw fa-file-audio"></i> Transcrição de Áudio</NavLink></li>
            <li><NavLink activeClassName="selected" to="/entity-detection"><i className="fas fa-fw fa-tag"></i> Detecção de Entidades</NavLink></li>
          </ul>

          
        </aside>

        <main>

          <Switch>

            <Route path="/audio-transcription/:id">
              <AudioDetailPage />
            </Route>

            <Route path="/audio-transcription">
              <AudioListPage />
            </Route>

            <Route path="/entity-detection/:id">
              <EntityDetailPage />
            </Route>

            <Route path="/entity-detection">
              <EntityListPage />
            </Route>

          </Switch>
          
        </main>

      </Router>
    </div>
  );
}

export default App;
