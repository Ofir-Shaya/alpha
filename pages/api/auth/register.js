import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

export default async function handler(request, response) {
  if (request.method === "POST") {
    if (!request.body)
      return response.status(404).json({ error: "Don't have form data." });
    const { email, password, profile, champion } = request.body;
    // check duplicate users
    if (
      await prisma.user.findUnique({
        where: {
          email: email,
        },
      })
    )
      return response.status(422).json({ message: "User Already Exists." });

    const user = await prisma.user.create({
      data: {
        email: email,
        password: await bcrypt.hash(password, 10),
        favProfile: profile,
        favChampion: champion,
      },
    });
    if (user) {
      const { password, ...result } = user;
      return response.status(201).json({ status: true, user: result });
    }
  } else {
    response
      .status(500)
      .json({ message: "HTTP method not valid, only POST methods accepted." });
  }
}
