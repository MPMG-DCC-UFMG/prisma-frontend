import './App.scss';
import Login from './pages/Login';
import Register from './pages/Register';

import CaseDetail from './pages/Case/Detail';

import EntityDetectionAnnotation from './pages/EntityDetection/Annotations';
import EntityDetectionImport from './pages/EntityDetection/Import';
import EntityDetectionEntities from './pages/EntityDetection/Entities/List';
import EntityDetectionEntitiesForm from './pages/EntityDetection/Entities/Form';

import AudioTranscription from './pages/AudioTranscription/View';
import Paraphrase from './pages/Paraphrase';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './reducers/store';
import { fetchUser } from './reducers/users'
import React, { useEffect } from 'react';
import { ApiRequest } from './services/apiRequestService';
import CrudForm from './pages/Crud/CrudForm';

import CrudList from './pages/Crud/CrudList';

import userForm from './data/form/user.json';
import caseForm from './data/form/case.json';
import audioTranscriptionForm from './data/form/audio-transcription.json';
import classificationLabelForm from './data/form/classification_label.json';
import classificationForm from './data/form/classification.json';
import RegisterSuccess from './pages/Register/success';
import CaseAddUser from './pages/Case/AddUser';
import CaseList from './pages/Case/List';
import UserAddCase from './pages/User/AddCase';
import AudioTranscriptionAddFiles from './pages/AudioTranscription/AddFiles';
import AudioTranscriptionExport from './pages/AudioTranscription/Export';
import EditUser from './pages/User/Edit';
import Unauthorized from './pages/Login/unauthorized';
import ClassificationAddFiles from './pages/Classification/AddFiles';
import ClassificationView from './pages/Classification/View';
import ClassificationExport from './pages/Classification/Export';

function AppWrapper() {

  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
}

function Routes() {

  const history = useHistory();

  useEffect(() => {
    if (ApiRequest.token) {
      store.dispatch(fetchUser());
    } else {
      history.replace("/login");
    }
  }, []);



  const crudRoutes = (prefix, props) => {
    return [
      <Route exact={true} path={`${prefix}/new`}>
        <CrudForm {...props} />
      </Route>,
      <Route exact={true} path={`${prefix}/:id`}>
        <CrudForm {...props} editing={true} />
      </Route>,
      <Route exact={true} path={`${prefix}`}>
        <CrudList {...props} />
      </Route>
    ]
  }

  return (

    <Switch>

      <Route path="/user/me">
        <EditUser />
      </Route>

      <Route path="/user/password">
        <EditUser type='password' />
      </Route>

      {crudRoutes("/user", { formData: userForm })}

      <Route path="/user/:userId/cases">
        <UserAddCase />
      </Route>

      {crudRoutes("/case", { formData: caseForm })}

      <Route path="/case/:projectId/detail">
        <CaseDetail />
      </Route>

      <Route path="/case/:projectId/users">
        <CaseAddUser />
      </Route>

      <Route path="/case/:projectId/audio-transcription/addFiles">
        <AudioTranscriptionAddFiles />
      </Route>

      <Route path="/case/:projectId/audio-transcription/export">
        <AudioTranscriptionExport />
      </Route>

      {crudRoutes("/case/:projectId/audio-transcription", { formData: audioTranscriptionForm })}

      <Route path="/case/:projectId/audio-transcription/:id/view">
        <AudioTranscription />
      </Route>

      <Route path="/case/:projectId/classification/addFiles">
        <ClassificationAddFiles />
      </Route>

      <Route path="/case/:projectId/classification/export">
        <ClassificationExport />
      </Route>

      <Route path="/case/:projectId/classification/:id/view">
        <ClassificationView />
      </Route>

      {crudRoutes("/case/:projectId/classification-label", { formData: classificationLabelForm })}
      {crudRoutes("/case/:projectId/classification", { formData: classificationForm })}

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

      <Route path="/paraphrase/:entityId">
        <Paraphrase />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/register/success">
        <RegisterSuccess />
      </Route>

      <Route path="/401">
        <Unauthorized />
      </Route>

      <Route path="/register">
        <Register />
      </Route>

      <Route path="/">
        <CaseList />
      </Route>

    </Switch>
  )
}

export default AppWrapper;
