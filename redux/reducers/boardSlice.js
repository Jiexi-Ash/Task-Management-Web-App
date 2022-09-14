import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  board: [],
  loading: false,
  selectedBoard: null,
};

export const createBoard = createAsyncThunk(
  "board/createBoard",
  async ({ name, columns }, { dispatch }) => {
    try {
      console.log({ name, columns });
      const board = await axios.patch("/api/boards/create", {
        name,
        columns,
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
    updateBoardColumn(state, action) {
      const column = state.selectedBoard.columns.find(
        (column) => column._id === action.payload._id
      );

      column.tasks = action.payload.tasks;
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

export const { setUserBoards, setSelectedBoard, updateBoardColumn } =
  boardSlice.actions;

export default boardSlice.reducer;
