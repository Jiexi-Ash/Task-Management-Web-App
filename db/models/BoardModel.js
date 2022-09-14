import mongoose from "mongoose";

const subTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  subTasks: [subTaskSchema],
});

const columnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tasks: [taskSchema],
});

const BoardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    columns: [columnSchema],
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Board = mongoose.models.Board || mongoose.model("Board", BoardSchema);

export default Board;
