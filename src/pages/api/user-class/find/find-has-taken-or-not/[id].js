import { prisma } from "@/config";
import { customResponse } from "@/lib/customResponse";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const headers = await getServerSession(req, res, authOptions);
  const headersMail = headers.user.email;

  if (!headers) {
    return res.status(405).json({ message: "Unauthorized" });
  }
  const compareSession = await prisma.user.findFirst({
    where: {
      email: headersMail,
    },
  });
  if (!compareSession) {
    return res.status(405).json({ message: "Unauthorized" });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    const data = await prisma.user_class.findFirst({
      where: {
        user_id: compareSession.id,
        classs_id: id,
      },
    });

    if (!data) {
      res.status(201).json(customResponse({ data: null, type: "find" }));
    }

    res.status(201).json(customResponse({ data: data, type: "find" }));
  } catch (error) {
    console.log("(SERVER API) Error Find Has Taken Or Not User Class", error);
  }
}
