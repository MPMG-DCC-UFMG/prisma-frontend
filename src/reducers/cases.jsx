import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiRequest } from '../services/apiRequestService'
import { CaseUrlBuilder } from '../services/urlBuilder/caseUrlBuilder';

export const fetchCases = createAsyncThunk(
  'fetchCases',
  async () => {
    const response = await ApiRequest.get( new CaseUrlBuilder().get() );
    return response
  }
)

export const fetchCaseById = createAsyncThunk(
  'fetchCaseById',
  async (id) => {
    const response = await ApiRequest.get( new CaseUrlBuilder().withId(id).get() );
    return response
  }
)

export const deleteCaseById = createAsyncThunk(
  'fetchCaseById',
  async (id) => {
    const response = await ApiRequest.delete( new CaseUrlBuilder().withId(id).get() );
    fetchCases();
    return response;
  }
)


export const userSlice = createSlice({
  name: 'user',
  initialState: {
  },
  reducers: {
    setCase: (state, action) => {
      state.currentCase = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCases.fulfilled, (state, action) => {
      state.caseList = action.payload
    })
    .addCase(fetchCaseById.fulfilled, (state, action) => {
      state.currentCase = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
export const { setCase } = userSlice.actions

export default userSlice.reducer