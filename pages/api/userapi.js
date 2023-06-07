import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { transporter } from "../../config/nodemailer";
import jwt from "jsonwebtoken";

const myEmail = process.env.EMAIL;
const jwtSecret = process.env.JWT_SECRET;

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      try {
        const email = req.query.email;
        if (!email) return { status: 400, message: "Bad request" };

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) return { status: 400, message: "Bad request" };

        const token = encodeURIComponent(jwt.sign(user.email, jwtSecret));
        const data = {};
        data.emailMessage = `Dear ${user.email}, We've attached a link that you could reset your password through.\n
       We hope you will enjoy using our site.\n
       From Alpha :)`;
        data.link = `http://localhost:3000/forgot-password/${token}/${user.email}`;

        try {
          await transporter.sendMail({
            from: myEmail,
            to: user.email,
            ...generateEmailContent(data),
            subject: "Recover password request",
          });
          return { success: true };
        } catch (error) {
          console.log(error);
          return { status: 400, message: "Bad request" };
        }
      } catch (error) {
        console.error(error);
      }
      break;
    }

    case "GET":
      handleGET(req, res);
      break;

    case "PATCH":
      handlePATCH(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  return;
}

async function handleGET(req, res) {
  try {
    let data;
    switch (req.query.func) {
      case "userInfo":
        data = await userInfo(req.query.email);
        res.status(200).json(data);
        break;

      case "verifyToken":
        data = await verifyToken(req.query.email, req.query.token);
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

async function handlePATCH(req, res) {
  try {
    let data;
    switch (req.query.func) {
      case "updatePassword":
        data = await updatePassword(
          req,
          res,
          req.query.email,
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
    console.error(error);
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

const CONTACT_MESSAGE_FIELDS = {
  link: "Link",
  emailMessage: "",
  subject: "Subject",
  message: "Message",
};

const generateEmailContent = (data) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) => (str += `${CONTACT_MESSAGE_FIELDS[key]}\n${val}\n \n`),
    ""
  );
  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    return (str += `<h3 class="form-heading" align="left" style="direction:ltr;">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left"  style="direction:ltr;">${val}</p>`);
  }, "");
  return {
    text: stringData,
    html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2 style="direction:ltr; align:left;">Recover your password</h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`,
  };
};

const verifyToken = async (email, token) => {
  if (!email || !token) return { status: 400, message: "Bad request" };
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return { status: 400, message: "Bad request" };
    }

    const decoded = jwt.verify(token, jwtSecret);

    if (email === decoded) {
      return { status: 200, success: true };
    }

    return { status: 400, message: "Bad request" };
  } catch (error) {
    console.error(error);
    return { status: 400, message: "Bad request" };
  }
};

async function updatePassword(req, res, email, newPassword) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) return { status: 400, message: "Bad request" };

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        user: {
          update: {
            password: hashedPassword,
          },
        },
      },
    });
    if (result) {
      return { status: 200, success: true };
    } else {
      return { status: 400, message: "Bad request" };
    }
  } catch (error) {
    console.error(error);
    return { status: 400, message: "Bad request" };
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
    return updated;
  } catch (error) {
    console.error(error);
  }
}
