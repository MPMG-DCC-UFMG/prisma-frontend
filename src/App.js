import './App.scss';
import Home from './pages/Home';

import CaseDetail from './pages/Case/Detail';
import CaseForm from './pages/Case/Form';

import EntityDetectionAnnotation from './pages/EntityDetection/Annotations';
import EntityDetectionImport from './pages/EntityDetection/Import';
import EntityDetectionEntities from './pages/EntityDetection/Entities/List';
import EntityDetectionEntitiesForm from './pages/EntityDetection/Entities/Form';

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

      <Route path="/case/new">
          <CaseForm />
        </Route>

        <Route path="/case/:caseId">
          <CaseDetail />
        </Route>

        <Route path="/entity-detection/import">
          <EntityDetectionImport />
        </Route>

        <Route path="/entity-detection/entities/new">
          <EntityDetectionEntitiesForm />
        </Route>

        <Route path="/entity-detection/entities">
          <EntityDetectionEntities />
        </Route>

        <Route path="/entity-detection/:entityId">
          <EntityDetectionAnnotation />
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
