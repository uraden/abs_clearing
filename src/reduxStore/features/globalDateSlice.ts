import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    globalDate: [],
    status: "idle",
    error: null,
    loading: false,
    };

export const fetchGlobalDate = createAsyncThunk(
    "globalDate/fetchGlobalDate",
    async () => {
        const response = await axios.get("http://100.1.0.220:8090/api/v1/oper-day/all");
        return response.data;
    }
);

const globalDateSlice = createSlice({
    name: "globalDate",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGlobalDate.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchGlobalDate.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.globalDate = action.payload;
            })
            .addCase(fetchGlobalDate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
            
    },
});

export default globalDateSlice.reducer;