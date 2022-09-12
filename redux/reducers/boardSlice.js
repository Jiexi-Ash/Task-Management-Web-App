import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  board: [],
  loading: false,
  selectedBoard: null,
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
  reducers: {
    setUserBoards(state, action) {
      state.board = action.payload;
    },
    setSelectedBoard(state, action) {
      state.selectedBoard = action.payload;
    },
  },
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

export const { setUserBoards, setSelectedBoard } = boardSlice.actions;

export default boardSlice.reducer;
