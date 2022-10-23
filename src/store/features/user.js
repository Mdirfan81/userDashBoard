import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { apiUrl } from "../../utils/constant";

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/allUsers`);

      console.log("Fetch All Users", response);
      return response.data;
    } catch (err) {
      console.error(err);
      return "400";
    }
  }
);

export const fetchSingleUsers = createAsyncThunk(
  "user/fetchSingleUsers",
  async (id) => {
    try {
      id = parseInt(id);
      const response = await axios.get(`${apiUrl}/getUser/${id}`);

      console.log(response);
      console.log("Fetch Single Users", response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      return "400";
    }
  }
);

export const fetchAuth = createAsyncThunk("user/fetchAuth", async (payload) => {
  try {
    const response = await axios.post(`${apiUrl}/auth`, payload);

    return response.data;
  } catch (err) {
    console.error(err);
  }
});

export const fetchCreateUser = createAsyncThunk(
  "user/fetchCreateUser",
  async (payload) => {
    try {
      const response = await axios.post(`${apiUrl}/create`, payload);

      console.log(response);
      console.log("Fetch Create Users", response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      return "400";
    }
  }
);

export const fetchUpdateUser = createAsyncThunk(
  "user/fetchUpdateUser",
  async (id, payload) => {
    try {
      // payload = JSON.parse(payload);
      console.log("here API Update", id, payload);
      console.log("here API Update URL URL", `${apiUrl}/update/${id}`);
      const response = await axios.put(`${apiUrl}/update/${id}`, payload);

      console.log(response);
      console.log("Fetch Update Users", response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      return "400";
    }
  }
);

export const fetchDeleteUser = createAsyncThunk(
  "user/fetchDeleteUser",
  async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/delete/${id}`);

      console.log(response);
      console.log("Fetch Deleted Users", response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      return "400";
    }
  }
);

const initialState = {
  allData: {},
  currentUser: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setAllUser: (state, action) => {
      state.allData = action.payload;
    },
    deleteUser: (state, action) => {
      let data = state.allData.filter((val) => val.id !== parseInt(action.id));
      state.allData = data;
    },
  },
  extraReducers: {
    [fetchAllUsers.fulfilled]: (state, { payload }) => {
      console.log("Fetch all Users successfully");
      // console.log("In the All users", typeof payload, payload.data.myJsonFile);
      return { allData: payload.data.myJsonFile };
    },
    [fetchSingleUsers.fulfilled]: (state, { payload }) => {
      console.log("Fetch Single Users successfully");
      return { payload };
    },
    [fetchAuth.fulfilled]: (state, { payload }) => {
      console.log("Fetch Current Users successfully", payload.data);
      return { currentUser: payload.data };
    },
    [fetchCreateUser.fulfilled]: (state, { payload }) => {
      console.log("Fetch Created Users successfully");
      return { payload };
    },
    [fetchUpdateUser.fulfilled]: (state, { payload }) => {
      console.log("Fetch Updated Users successfully");
      return { payload };
    },
    [fetchDeleteUser.fulfilled]: (state, { payload }) => {
      console.log("Fetch Deleted Users successfully");
      return { payload };
    },
    //   // ---------------------------------------------------------------------------
    //   [fetchAllUsers.rejected]: () => {
    //     return "failed";
    //   },

    //   [fetchSingleUsers.rejected]: () => {
    //     return "failed";
    //   },
    //   [fetchAuth.rejected]: (state) => {
    //     console.log("Here the auth rejected");
    //     return { email: "Email Not found" };
    //   },
    //   [fetchCreateUser.rejected]: () => {
    //     return "failed";
    //   },
    //   [fetchUpdateUser.rejected]: () => {
    //     return "failed";
    //   },
    //   [fetchDeleteUser.rejected]: () => {
    //     return "failed";
    //   },
  },
  // // ---------------------------------------------------------------------------
});

export const { setCurrentUser, setAllUser, deleteUser } = userSlice.actions;

export const getCurrentUser = (state) => state.user.currentUser;
export const getAllUser = (state) => state.user.allData;

export default userSlice.reducer;
