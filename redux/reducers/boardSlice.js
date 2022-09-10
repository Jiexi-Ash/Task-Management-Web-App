import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: [],
  loading: false,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default boardSlice.reducer;
