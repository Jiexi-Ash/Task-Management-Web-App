import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
  column: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Column",
  },
});

const boardColumnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tasks: [taskSchema],
});

const BoardSchema = new mongoose.Schema(
  {
    boardName: {
      type: String,
      required: true,
    },
    boardColumns: [boardColumnSchema],
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // tasks
    tasks: [taskSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Board || mongoose.model("Board", BoardSchema);
