import { configureStore } from '@reduxjs/toolkit'
import userReducer from './users';
import caseReducer from './cases';
import audioTranscriptionReducer from './audioTranscription';

export default configureStore({
  reducer: {
      user: userReducer,
      case: caseReducer,
      audioTranscription: audioTranscriptionReducer
  }
})