import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiRequest } from '../services/apiRequestService'
import BaseUrls from '../utils/baseUrls';

export const fetchAudioTranscription = createAsyncThunk(
  'audioTranscription/fetch',
  async (params) => {
    const response = await ApiRequest.setUrl(BaseUrls.AUDIO_TRANSCRIPTION, params).get();
    return response;
  }
)

export const userSlice = createSlice({
  name: 'audioTranscription',
  initialState: {
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAudioTranscription.fulfilled, (state, action) => {
        state.data = action.payload;
    })
  }
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer