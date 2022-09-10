import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  board: [],
  loading: false,
};

export const createBoard = createAsyncThunk(
  "board/createBoard",
  async ({ boardName, boardColumns }, { dispatch }) => {
    try {
      console.log({ boardName, boardColumns });
      const board = await axios.post("/api/boards/create", {
        boardName,
        boardColumns,
      });

      console.log(board);
      return board.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getBoards = createAsyncThunk(
  "board/getBoards",
  async ({ boardName, boardColumns }, { dispatch }) => {
    try {
      return board.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: {
    [createBoard.pending]: (state, action) => {
      state.loading = true;
    },
    [createBoard.fulfilled]: (state, action) => {
      state.board = [...state.board, action.payload];
      state.loading = false;
    },
    [createBoard.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default boardSlice.reducer;
