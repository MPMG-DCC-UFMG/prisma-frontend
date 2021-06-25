import './App.scss';
import Home from './pages/Home';
import CaseDetail from './pages/CaseDetail';
import EntityDetection from './pages/EntityDetection';
import AudioTranscription from './pages/AudioTranscription';
import Paraphrase from './pages/Paraphrase';

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
          <CaseDetail />
        </Route>

        <Route path="/entity-detection/:entityId">
          <EntityDetection />
        </Route>

        <Route path="/audio-transcription/:entityId">
          <AudioTranscription />
        </Route>

        <Route path="/paraphrase/:entityId">
          <Paraphrase />
        </Route>

        <Route path="/">
          <Home />
        </Route>
        
      </Switch>
    </Router>
  );
}

export default App;
