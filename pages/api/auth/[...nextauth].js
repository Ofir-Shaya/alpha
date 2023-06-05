import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { setCookie } from "nookies";

const NextAuthOptions = (req, res) => {
  return {
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
              throw new Error("No User Found. Please Sign Up.");
            }

            if (await bcrypt.compare(password, user.password)) {
              setCookie({ res }, "champion", user.favChampion, {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
              });
              setCookie({ res }, "profile", user.favProfile, {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
              });
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
  };
};
export default (req, res) => {
  return NextAuth(req, res, NextAuthOptions(req, res));
};
