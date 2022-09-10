import BoardModel from "db/models/BoardModel";

//  create a new board with name and columns
export const createBoard = async (boardName, boardColumns, userID) => {
  try {
    const board = await BoardModel.create({
      boardName,
      boardColumns,
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
