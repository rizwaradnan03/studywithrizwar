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
      email: headers.email
    }
  })
  if (!compareSession) {
    return res.status(405).json({ message: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const {
      name,
    } = req.body;

    const data = await prisma.class_type.create({
      data: {
        name: name,
      },
    });

    res.status(201).json(customResponse({ data: data, type: "create" }));
  } catch (error) {
    console.log("(SERVER API) Error Create Class Type", error);
  }
}
