import BoardModel from "db/models/BoardModel";

//  create a new board with name and columns
export const createBoard = async (name, columns, userID) => {
  try {
    const board = await BoardModel.create({
      name,
      columns,
      userID,
    });
    return board;
  } catch (err) {
    console.log(err);
  }
};

export const getBoards = async (userID) => {
  try {
    const boards = await BoardModel.find({ userID });
    return boards;
  } catch (err) {
    console.log(err);
  }
};

export const addTask = async (boardID, columnID, tasks, userId) => {
  console.log("addTask", boardID, columnID, tasks, userId);
  try {
    //   find board where user id is equal to the user id and the board id is equal to the board id
    const board = await BoardModel.findOne({
      userID: userId,
      _id: boardID,
    });

    const column = board.columns.id(columnID);
    column.tasks.push(tasks);
    await board.save();
    return column;
  } catch (err) {
    console.log(err);
  }
};

export const getTask = async (boardID, columnID, taskID, userID) => {
  //  find the board where the task is located and the column where the task is located and the task itself using the user id
  const board = await BoardModel.findOne({ _id: boardID, userID });
  const column = board.boardColumns.id(columnID);
  const task = column.tasks.id(taskID);
  return task;
};
