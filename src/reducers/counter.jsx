import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUsers = createAsyncThunk(
  'users/fetchByIdStatus',
  async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users")
    return response.data
  }
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    data: []
  },
  reducers: {
    data: (state) => {

    },
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer