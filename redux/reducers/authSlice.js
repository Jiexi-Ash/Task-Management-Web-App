import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signOut } from "next-auth/react";
import axios from "axios";

const initialState = {
  user: {
    _id: "",
    email: "",
  },
  authenticated: false,
  loading: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ userData, router }, { dispatch }) => {
    console.log("registerUser");
    console.log(userData);

    try {
      const user = await axios.post("/api/auth/register", userData);

      await signIn("credentials", {
        email: user.data.email,
        password: userData.password,
        redirect: false,
      }).then(() => {
        router.push("/");

        return {
          id: user.data._id,
          email: user.data.email,
        };
      });
    } catch (err) {
      console.log(err);
    }
  }
);

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async ({ userData, router }, { dispatch }) => {
    console.log("registerUser");
    console.log(userData);

    try {
      const result = await signIn("credentials", {
        email: userData.email,
        password: userData.password,
        redirect: false,
      });
      console.log(result);

      if (result.error) {
        throw err;
      }

      const user = await axios.get("/api/users/user");
      router.push("/");
      console.log(user);
      return {
        id: user.data._id,
        email: user.data.email,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.authenticated = true;
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
    },
    [signInUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signInUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.authenticated = true;
    },
  },
});

export default authSlice.reducer;
