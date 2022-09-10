import mongoose from "mongoose";

const boardColumnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // tasks
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const BoardSchema = new mongoose.Schema(
  {
    boardName: {
      type: String,
      required: true,
    },
    boardColumns: [boardColumnSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Board || mongoose.model("Board", BoardSchema);
