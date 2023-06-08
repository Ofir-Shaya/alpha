import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

const NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {
        try {
          const { email, password } = credentials;

          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });
          if (!user) {
            return null;
          }

          if (await bcrypt.compare(password, user.password)) {
            // If the credentials are valid, return the user object
            const { password, ...result } = user;

            return result;
          } else {
            // If the credentials are invalid, return error.

            return null;
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Handle the sign-in error and return a response
      const isAllowedToSignIn = user;

      if (isAllowedToSignIn) {
        return Promise.resolve(true);
      } else {
        return Promise.reject(new Error("Invalid credentials"));
      }
    },
  },
};

export default (req, res) => {
  return NextAuth(req, res, NextAuthOptions);
};
