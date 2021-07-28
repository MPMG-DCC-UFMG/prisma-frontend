import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiRequest } from '../services/apiRequestService'
import { UserUrlBuilder } from '../services/urlBuilder/userUrlBuilder'

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async () => {
    const response = await ApiRequest.get( new UserUrlBuilder().me().get() );
    return response
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer