import { prisma } from "@/config";
import { customResponse } from "@/lib/customResponse";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const headers = await getServerSession(req, res, authOptions);
  if (!headers) {
    return res.status(405).json({ message: "Unauthorized" });
  }
  const compareSession = await prisma.user.findFirst({
    where: {
      email: headers.email,
    },
  });
  if (!compareSession) {
    return res.status(405).json({ message: "Unauthorized" });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const findUser = await prisma.user.findFirst({
      where: { email: headers.user.email },
    });

    if (!findUser) {
      return res.status(405).json({ message: "User Not Found" });
    }

    const userClass = await prisma.user_class.findMany({
      include: { classs: true },
      where: { user_id: findUser.id },
    });

    res.status(201).json(customResponse({ data: userClass, type: "find" }));
  } catch (error) {
    console.log("(SERVER API) Error Find All Class", error);
  }
}
