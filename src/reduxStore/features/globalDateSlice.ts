import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IOperday } from "../../assets/interfaces";
import { getProfile } from "../../assets/reusable/requests";

const initialState = {
  globalDate: [],
  status: "idle",
  error: null,
  loading: false,
};

const initialSocketState = {
  sn: null,
  status: "idle",
  error: null,
  loading: false,
};

const initialProfileState = {
  globalDate: {
    id: 0,
    userName: "",
    fullName: "",
    roleId: 0,
    roleName: "",
    roleDescription: "",
    clientId: 1,
    clientName: "",
    expiredDate: "",
    isActive: false,
  },
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
    return Promise.reject(error);
  }
);

export const fetchGlobalDate = createAsyncThunk(
  "globalDate/fetchGlobalDate",
  async () => {
    // const response = await axios.get("http://100.1.0.220:8090/api/v1/oper-day/all");
    //  return response.data;
    const response = await httpClient.get(
      "http://100.1.0.220:8090/api/v1/oper-day/all"
    );
    return response.data;
  }
);

export const fetchProfile = createAsyncThunk(
  "globalDate/fetchProfile",
  async () => {
    // const response = await axios.get("http://100.1.0.220:8090/api/v1/oper-day/all");
    //  return response.data;
    const request = await getProfile();
    return request;
  }
);
export const fetchSn = createAsyncThunk(
  "globalDate/fetchSn",
  async (sn: number) => {
    return sn;
  }
);

const globalDateSlice = createSlice({
  name: "globalDate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalDate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGlobalDate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.globalDate = action.payload.find((day: IOperday) => day.isActive);
      })
      .addCase(fetchGlobalDate.rejected, (state, action) => {
        state.status = "failed";
        // @ts-expect-error try
        state.error = action.error.message;
      });
  },
});

const globalProfile = createSlice({
  name: "globalProfile",
  initialState: initialProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("global: ", action.payload);
        state.globalDate = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        // @ts-expect-error try
        state.error = action.error.message;
      });
  },
});

const globalSocket = createSlice({
  name: "globalSocket",
  initialState: initialSocketState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSn.fulfilled, (state, action) => {
        state.status = "succeeded";
        //@ts-ignore
        state.sn = action.payload;
      })
      .addCase(fetchSn.rejected, (state, action) => {
        state.status = "failed";
        // @ts-expect-error try
        state.error = action.error.message;
      });
  },
});

export default {
  global: globalDateSlice.reducer,
  profile: globalProfile.reducer,
  socket: globalSocket.reducer,
};
