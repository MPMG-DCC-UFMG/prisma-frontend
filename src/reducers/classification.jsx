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

export const fetchClassificationQuery = createAsyncThunk(
    'classificationQuery/fetch',
    async (params) => {
        const query = await ApiRequest.setUrl(BaseUrls.CLASSIFICATION_QUERY, params).get();
        return query
    }
)

export const fetchClassificationLabels = createAsyncThunk(
    'classificationLabels/fetch',
    async (params) => {
        const response = await ApiRequest.setUrl(BaseUrls.CLASSIFICATION_LABELS, params).get();
        return response;
    }
)

export const fetchClassificationScores = createAsyncThunk(
    'classificationScores/fetch',
    async (params) => {
        const response = await ApiRequest.setUrl(BaseUrls.CLASSIFICATION_SCORES, params).get();
        return response;
    }
)

export const userSlice = createSlice({
    name: 'classification',
    initialState: {
        data: null,
        query: null,
        labels: null,
        scores: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchClassification.fulfilled, (state, action) => {
            state.data = action.payload;
        })
        .addCase(fetchClassificationLabels.fulfilled, (state, action) => {
            state.labels = action.payload;
        })
        .addCase(fetchClassificationScores.fulfilled, (state, action) => {
            state.scores = action.payload;
        })
        .addCase(fetchClassificationQuery.fulfilled, (state, action) => {
            state.query = action.payload;
        })
        .addCase(fetchClassificationQuery.pending, (state, action) => {
            state.query = null;
        })
    }
})

// Action creators are generated for each case reducer function
// eslint-disable-next-line no-empty-pattern
export const {} = userSlice.actions

export default userSlice.reducer