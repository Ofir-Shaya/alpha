import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      handlePOST(req, res);
      break;
    case "GET":
      handleGET(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function registerUser(email, password) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });
    if (existingUser) {
      console.log("user already exist");
    } else {
      const user = { userEmail: email, userPassword: password };
      await prisma.user.create({
        data: {
          email: user.userEmail,
          password: user.password,
        },
      });

      console.log("new user created", user);
      return user;
    }
  } catch (error) {
    console.error(error);
  }
}

async function handleGET(req, res) {
  try {
    let data;
    switch (req.query.func) {
      case "register":
        data = await registerUser(req.query.email, req.query.password);
        res.status(200).json(data);

        break;
      default:
        console.error("bad query func");
        break;
    }
    return data;
  } catch (error) {
    return res.status(500).json(error);
  }
}
