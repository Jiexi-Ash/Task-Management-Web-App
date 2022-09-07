import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import connectDB from "db/connectDB";
import { comparePassword } from "db/utils/tools";
import { findUserByEmail } from "db/services/user.services";

export default NextAuth({
  session: {
    jwt: true,
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectDB();

        const user = await findUserByEmail(credentials.email, {});

        if (!user) {
          throw new Error("No user found");
        }

        const isMatch = await comparePassword(
          credentials.password,
          user.password
        );

        if (!isMatch) {
          throw new Error("Password is incorrect");
        }

        return {
          email: user.email,
        };
      },
    }),
  ],
});
