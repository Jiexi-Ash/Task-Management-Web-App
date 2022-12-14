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

      const { name, columns } = req.body;
      console.log(req.body);
      console.log("request", { name, columns });

      const board = await createBoard(name, columns, user._id);

      res.status(200).json(board);
    } catch (e) {
      console.log("problem here");
      console.log("something went wrong");
      res.status(500).json({ error: e.message });
    }
  });

export default handler;
