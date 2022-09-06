import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiRequest } from '../services/apiRequestService'
import BaseUrls from '../utils/baseUrls';

export const fetchImage = createAsyncThunk(
  'image/fetch',
  async (params) => {
   const {projectId, id} = params
   console.log('PARAMS', params)
    const response = await ApiRequest.setUrl(`project/${projectId}/image/${id}`).get();
    console.log('RESPONSE', response)
    return response;
  }
)

export const userSlice = createSlice({
  name: 'image',
  initialState: {
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImage.fulfilled, (state, action) => {
        console.log('ACTION',action.payload)
        state.data = action.payload;
    })
  }
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer