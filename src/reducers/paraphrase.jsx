import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiRequest } from '../services/apiRequestService'
import BaseUrls from '../utils/baseUrls';

export const fetchParaphrase = createAsyncThunk(
    'paraphrase/fetch',
    async (params) => {
        const response = await ApiRequest.setUrl(BaseUrls.PARAPHRASE_VIEW, params).get();
        return response;
    }
)

export const fetchParaphraseList = createAsyncThunk(
    'paraphraseList/fetch',
    async (params) => {
        const response = await ApiRequest.setUrl(BaseUrls.PARAPHRASE_LIST, params).get();
        return response;
    }
)

export const userSlice = createSlice({
    name: 'paraphrase',
    initialState: {
        list: null,
        data: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchParaphrase.pending, (state, action) => {
                state.data = null;
            })
            .addCase(fetchParaphrase.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchParaphraseList.fulfilled, (state, action) => {
                state.list = action.payload;
            })
    }
})

// Action creators are generated for each case reducer function
// eslint-disable-next-line no-empty-pattern
export const { } = userSlice.actions

export default userSlice.reducer