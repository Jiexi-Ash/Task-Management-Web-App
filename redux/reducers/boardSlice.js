import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  board: [],
  loading: false,
  selectedBoard: null,
  selectedTask: null,
};

export const createBoard = createAsyncThunk(
  "board/createBoard",
  async ({ name, columns }, { dispatch }) => {
    try {
      console.log({ name, columns });
      const board = await axios.post("/api/boards/create", {
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

export const updateSubTask = createAsyncThunk(
  "board/updateSubTask",
  async (taskData, { dispatch }) => {
    try {
      const boardData = await axios.patch("/api/tasks/updateSubtask", taskData);

      return boardData.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateTask = createAsyncThunk(
  "board/updateTask",
  async (taskData, { dispatch }) => {
    try {
      console.log("updateTask", taskData);
      //   run an update and delete api call
      const boardData = await axios.patch("/api/tasks/updateTask", taskData);
      console.log(boardData.data);
      return boardData.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  "board/deleteBoard",
  async (boardID, { dispatch }) => {
    try {
      console.log("deleteBoard", boardID);
      const boardData = await axios.delete(`/api/boards/delete/${boardID}`);

      console.log(boardData.data);
      return boardData.data;
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
    setSelectedTask(state, action) {
      state.selectedTask = action.payload;
    },
    updateSubTask(state, action) {},
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
    [getBoards.pending]: (state, action) => {
      state.loading = true;
    },
    [getBoards.fulfilled]: (state, action) => {
      state.board = action.payload;
      state.loading = false;
    },
    [getBoards.rejected]: (state, action) => {},
    [updateSubTask.pending]: (state, action) => {
      state.loading = true;
    },
    [updateSubTask.fulfilled]: (state, action) => {
      console.log("subtask", action.payload);
      state.selectedBoard = action.payload;
      state.loading = false;
    },
    [updateSubTask.rejected]: (state, action) => {},
    [updateTask.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTask.fulfilled]: (state, action) => {
      state.loading = false;
      state.selectedBoard = action.payload;
    },
    [updateTask.rejected]: (state, action) => {},
    [deleteBoard.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteBoard.fulfilled]: (state, action) => {
      state.loading = false;
      state.board = state.board.filter(
        (board) => board._id !== action.payload._id
      );
      // set the selected board to the first board in the array
      state.selectedBoard = state.board[0];
    },
  },
});

export const { setUserBoards, setSelectedBoard, updateBoardColumn } =
  boardSlice.actions;

export default boardSlice.reducer;
