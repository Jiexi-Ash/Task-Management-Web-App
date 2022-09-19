import nc from "next-connect";
import { deleteBoard } from "db/services/board.services";
import { findUserByEmail } from "db/services/user.services";
import checkAuth from "db/middleware/checkAuth";
import connectDB from "db/connectDB";

const handler = nc({
  onError(error, req, res) {},
})
  .use(checkAuth)
  .delete(async (req, res) => {
    console.log(req.session);
    try {
      console.log("deleteBoard");
      await connectDB();

      const user = await findUserByEmail(req.session.user.email, {
        password: 0,
      });
      //  get board id from query
      const { boardID } = req.query;

      const board = await deleteBoard(boardID, user._id);

      res.status(200).json(board);
    } catch (e) {
      console.log("problem here");
      console.log("something went wrong");
      res.status(500).json({ error: e.message });
    }
  });

export default handler;
