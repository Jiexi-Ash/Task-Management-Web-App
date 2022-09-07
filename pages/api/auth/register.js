import connectDB from "db/connectDB";
import User from "db/models/UserModel";
import { userExists } from "db/services/user.services";
import { hashPassword } from "db/utils/tools";

const register = async (req, res) => {
  if (req.method === "POST") {
    try {
      await connectDB();

      const { email, password } = req.body;

      if (await userExists(email)) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      const hashedPassword = await hashPassword(password);

      const newUser = new User({
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({
        message: "User created successfully",
        _id: newUser._id,
        email: newUser.email,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
};

export default register;
