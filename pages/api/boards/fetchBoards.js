import nc from "next-connect";
import { getBoards } from "db/services/board.services";
import checkAuth from "db/middleware/checkAuth";
import connectDB from "db/connectDB";
import { findUserByEmail } from "db/services/user.services";

const handler = nc({
  onError(error, req, res) {},
})
  .use(checkAuth)
  .get(async (req, res) => {
    console.log(req.session);
    try {
      await connectDB();

      const user = await findUserByEmail(req.session.user.email, {
        password: 0,
      });

      const boards = await getBoards(user._id);

      res.status(200).json(boards);
    } catch (e) {
      console.log("something went wrong");
      res.status(500).json({ error: e.message });
    }
  });

export default handler;
