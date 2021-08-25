import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiRequest } from '../services/apiRequestService'
import BaseUrls from '../utils/baseUrls';

export const fetchClassification = createAsyncThunk(
    'classification/fetch',
    async (params) => {
        const response = await ApiRequest.setUrl(BaseUrls.CLASSIFICATION_VIEW, params).get();
        return response;
    }
)

export const fetchClassificationLabels = createAsyncThunk(
    'classificationLabels/fetch',
    async (params) => {
        const response = await ApiRequest.setUrl(BaseUrls.CLASSIFICATION_LABELS, params).get();
        return response;
    }
)

export const userSlice = createSlice({
    name: 'classification',
    initialState: {
        data: null,
        labels: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchClassification.fulfilled, (state, action) => {
            state.data = action.payload;
        })
        .addCase(fetchClassificationLabels.fulfilled, (state, action) => {
            state.labels = action.payload;
        })
    }
})

// Action creators are generated for each case reducer function
// eslint-disable-next-line no-empty-pattern
export const {} = userSlice.actions

export default userSlice.reducer