import nc from "next-connect";
import checkAuth from "db/middleware/checkAuth";
import connectDB from "db/connectDB";
import { updateAndDeleteTask } from "db/services/board.services";
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
      const { boardID, columnID, taskID, updateColumnID } = req.body;
      console.log("API", req.body);

      const task = await updateAndDeleteTask(
        boardID,
        columnID,
        taskID,
        updateColumnID,
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
