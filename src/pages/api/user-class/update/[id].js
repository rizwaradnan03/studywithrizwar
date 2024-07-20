import { prisma } from "@/config";
import { customResponse } from "@/lib/customResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

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

  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    const { user_id, class_id } = req.body;

    const data = await prisma.user_class.update({
      data: {
        user_id: user_id,
        classs_id: class_id,
      },
      where: { id },
    });

    res.status(201).json(customResponse({ data: data, type: "update" }));
  } catch (error) {
    console.log("(SERVER API) Error Update User Class", error);
  }
}
