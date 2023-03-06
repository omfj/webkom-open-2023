import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const body = JSON.parse(req.body) as Data;
    const prisma = new PrismaClient();
    await prisma.post.delete({
      where: {
        id: body.id,
      },
    });

    res.status(200);
  }
}
