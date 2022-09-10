import nc from "next-connect";
import { createBoard } from "db/services/board.services";
import checkAuth from "db/middleware/checkAuth";
import connectDB from "db/connectDB";
import { findUserByEmail } from "db/services/user.services";

const handler = nc({
  onError(error, req, res) {},
})
  .use(checkAuth)
  .post(async (req, res) => {
    console.log(req.session);
    try {
      await connectDB();

      const user = await findUserByEmail(req.session.user.email, {
        password: 0,
      });
      console.log(user);

      const { boardName, boardColumns } = req.body;
      console.log("request", { boardName, boardColumns });

      const board = await createBoard(boardName, boardColumns, user._id);

      res.status(200).json(board);
    } catch (e) {
      console.log("something went wrong");
      res.status(500).json({ error: e.message });
    }
  });

export default handler;
