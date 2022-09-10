import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import boardReducer from "./reducers/boardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    board: boardReducer,
  },
});

export default store;
