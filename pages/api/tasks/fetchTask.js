import nc from "next-connect";
import checkAuth from "db/middleware/checkAuth";
import connectDB from "db/connectDB";
import { findUserByEmail } from "db/services/user.services";
import { getTask } from "db/services/board.services";

const handler = nc({
  onError(error, req, res) {},
}).get(async (req, res) => {
  try {
    const user = await findUserByEmail(req.session.user.email, {
      password: 0,
    });
  } catch (e) {}
});
