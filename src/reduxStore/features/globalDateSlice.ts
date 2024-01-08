import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IOperday } from "../../assets/interfaces";

const initialState = {
    globalDate: [],
    status: "idle",
    error: null,
    loading: false,
    };

export const httpClient = axios.create();

httpClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            // @ts-ignore
            config.headers = {
                Authorization: `Bearer ${token}`,
            };
        }

        return config;
    },
    (error) => {
        console.log('err before: ', error);
        // if (error.response.status === 401) {
        //   console.log('err after: ', error.response);
        //   // return window.location.href = '/login';
        //   localStorage.clear()
        // }
        return Promise.reject(error);
    }
);

export const fetchGlobalDate = createAsyncThunk(
    "globalDate/fetchGlobalDate",
    async () => {
        // const response = await axios.get("http://100.1.0.220:8090/api/v1/oper-day/all");
        //  return response.data;
        const response = await httpClient.get("http://100.1.0.220:8090/api/v1/oper-day/all");
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
                state.globalDate = action.payload.find((day: IOperday) => day.isActive);
            })
            .addCase(fetchGlobalDate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
            
    },
});

export default globalDateSlice.reducer;