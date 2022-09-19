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
    console.log("problem here");
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

export const updateSubTask = async (
  boardID,
  columnID,
  taskID,
  subTaskID,
  isCompleted,
  userID
) => {
  try {
    //  find the board where the task is located and the column where the task is located and the task itself using the user id
    const board = await BoardModel.findOne({ _id: boardID, userID });
    // find the columns array and find the column with the column id
    const column = board.columns.id(columnID);

    // find the tasks array and find the task with the task id
    const task = column.tasks.id(taskID);

    // find the subtasks array and find the subtask with the subtask id
    const subTask = task.subTasks.id(subTaskID);
    console.log(subTask);
    subTask.isCompleted = isCompleted;
    await board.save();

    return board;
  } catch (err) {
    console.log(err);
  }
};

export const updateAndDeleteTask = async (
  boardID,
  columnID,
  taskID,
  updateColumnID,
  userID
) => {
  try {
    //  find the board
    const board = await BoardModel.findOne({
      _id: "63219e5f26bc9df5b9cffa44",
      userID,
    });
    // move the task from one column to another
    const column = board.columns.id(columnID);
    const task = column.tasks.id(taskID);

    const updateColumn = board.columns.id(updateColumnID);
    //  updat task status to update column name
    task.status = updateColumn.name;
    // create new task
    const newTask = {
      status: updateColumn.name,
      title: task.title,
      subTasks: task.subTasks,
    };

    //  push new task to the update column
    updateColumn.tasks.push(newTask);

    //  remove task from the old column
    column.tasks.pull(taskID);

    await board.save();
    console.log(board);

    // await board.save();

    return board;
  } catch (err) {
    console.log(err);
  }
};

export const deleteBoard = async (boardID, userID) => {
  console.log(boardID, userID);
  try {
    const board = await BoardModel.findOneAndDelete({
      _id: boardID,
      userID,
    });
    return board;
  } catch (err) {
    console.log(err);
  }
};
