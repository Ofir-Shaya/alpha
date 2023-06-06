// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function fmtMSS(s) {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

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

async function handleGET(req, res) {
  try {
    let data;
    switch (req.query.func) {
      case "userInfo":
        data = await userInfo(req.query.email);
        res.status(200).json(data);
        break;

      default:
        console.error("bad query func");
        break;
    }
    return data;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function handlePOST(req, res, player) {
  try {
    const token = await getToken({ req });
    console.log(token);
    await prisma.user.create({
      data: {
        puuid: player.puuid,
        username: player.name,
      },
    });
    res.status(200).send();
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function userInfo(email) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      const { password, ...result } = user;
      return result;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { status: 404, message: "User not found." };
    } else {
      throw error;
    }
  }
}
