import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiRequest } from '../services/apiRequestService'
import BaseUrls from '../utils/baseUrls';

export const fetchEntityDetection = createAsyncThunk(
    'entityDetection/fetch',
    async (params) => {
        const response = await ApiRequest.setUrl(BaseUrls.ENTITY_DETECTION_VIEW, params).get();
        return response;
    }
)

export const userSlice = createSlice({
    name: 'entityDetection',
    initialState: {
        data: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchEntityDetection.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
})

// Action creators are generated for each case reducer function
// eslint-disable-next-line no-empty-pattern
export const {} = userSlice.actions

export default userSlice.reducer