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

  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    const data = await prisma.classs.delete({ where: { id } });

    res.status(201).json(customResponse({ data: data, type: "delete" }));
  } catch (error) {
    console.log("(SERVER API) Error Delete Class", error);
  }
}
