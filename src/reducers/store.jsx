import { configureStore } from '@reduxjs/toolkit'
import userReducer from './users';
import caseReducer from './cases';
import audioTranscriptionReducer from './audioTranscription';
import classificationReducer from './classification';
import entityDetectionReducer from './entityDetection';
import paraphraseReducer from './paraphrase';

export default configureStore({
  reducer: {
      user: userReducer,
      case: caseReducer,
      classification: classificationReducer,
      entityDetection: entityDetectionReducer,
      paraphrase: paraphraseReducer,
      audioTranscription: audioTranscriptionReducer
  }
})