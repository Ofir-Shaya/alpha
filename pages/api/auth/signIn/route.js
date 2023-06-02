import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

export async function Post(request) {
  const body = await request.json();

  const user = await prisma.User.findFirst({
    where: {
      email: body.email,
    },
  });

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user;
    return new Response(JSON.stringify(userWithoutPass));
  } else return new Response(JSON.stringify(null));
}
