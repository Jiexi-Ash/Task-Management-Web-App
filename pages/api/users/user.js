import nc from "next-connect";
import { findUserByEmail } from "db/services/user.services";
import connectDB from "db/connectDB";
import checkAuth from "db/middleware/checkAuth";

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

      res.status(200).json(user);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

export default handler;
