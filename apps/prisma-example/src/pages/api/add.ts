import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const prisma = new PrismaClient();
    const count = await prisma.post.count();
    await prisma.post.create({
      data: {
        title: `Blost post #${count}`,
        content: "This is a blog post",
      },
    });

    res.status(200);
  }
}
