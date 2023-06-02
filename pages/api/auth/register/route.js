import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

export async function POST(request) {
  const body = await request.json();

  if (
    await prisma.User.findFirst({
      where: {
        email: body.email,
      },
    })
  )
    return null;

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
      profile: body.profile,
      champion: body.champion,
    },
  });

  const { password, ...result } = user;
  return new Response(JSON.stringify(result));
}
