import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

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

      case "updatePassword":
        data = await updatePassword(
          req.query.email,
          req.query.oldPassword,
          req.query.newPassword
        );
        res.status(200).json(data);
        break;

      case "updateProfile":
        data = await updateProfile(req.query.email, req.query.newProfile);
        res.status(200).json(data);
        break;

      case "updateChampion":
        data = await updateChampion(req.query.email, req.query.newChampion);
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

async function handlePOST(req, res) {
  try {
    const token = await getToken({ req });
    console.log(token);
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

async function updatePassword(email, oldPassword, newPassword) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) return;
    console.log(oldPassword, newPassword);
    if (await bcrypt.compare(oldPassword, user.password)) {
      const updated = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          password: await bcrypt.hash(newPassword, 10),
        },
      });
      console.log(updated);
      return updated;
    }
  } catch (error) {
    console.error(error);
  }
}
async function updateProfile(email, newProfile) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) return;
    const updated = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        favProfile: newProfile,
      },
    });
    console.log(updated);
    return updated;
  } catch (error) {
    console.error(error);
  }
}
async function updateChampion(email, newChampion) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) return;
    const updated = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        favChampion: newChampion,
      },
    });
    console.log(updated);
    return updated;
  } catch (error) {
    console.error(error);
  }
}
