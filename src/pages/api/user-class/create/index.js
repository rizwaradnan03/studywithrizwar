import { prisma } from "@/config";
import { customResponse } from "@/lib/customResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

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

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { class_id } = req.body;
    console.log("isi class id", class_id);
    if (!class_id) {
      return res.status(405).json({ message: "Payload Not Found" });
    }

    const data = await prisma.user_class.create({
      data: {
        user_id: compareSession.id,
        classs_id: class_id,
      },
    });

    res.status(201).json(customResponse({ data: data, type: "create" }));
  } catch (error) {
    console.log("(SERVER API) Error Create User Class", error);
  }
}
