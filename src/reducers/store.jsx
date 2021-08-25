import { configureStore } from '@reduxjs/toolkit'
import userReducer from './users';
import caseReducer from './cases';
import audioTranscriptionReducer from './audioTranscription';
import classificationReducer from './classification';

export default configureStore({
  reducer: {
      user: userReducer,
      case: caseReducer,
      classification: classificationReducer,
      audioTranscription: audioTranscriptionReducer
  }
})