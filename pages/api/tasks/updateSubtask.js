import nc from "next-connect";
import checkAuth from "db/middleware/checkAuth";
import connectDB from "db/connectDB";
import { updateSubTask } from "db/services/board.services";
import { findUserByEmail } from "db/services/user.services";

const handler = nc({
  onError(error, req, res) {},
})
  .use(checkAuth)
  .patch(async (req, res) => {
    console.log("Hello");
    try {
      await connectDB();

      const user = await findUserByEmail(req.session.user.email, {
        password: 0,
      });
      const { boardID, columnID, subTaskID, taskID, isCompleted } = req.body;
      console.log("API", req.body);

      const task = await updateSubTask(
        boardID,
        columnID,
        taskID,
        subTaskID,
        isCompleted,
        user._id
      );

      res.status(200).json(task);
    } catch (e) {
      console.log("something went wrong");
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  });

export default handler;
