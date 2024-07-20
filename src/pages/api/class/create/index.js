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
    const {
      name,
      description,
      class_type_id,
      programming_language,
      image_logo,
    } = req.body;

    const data = await prisma.classs.create({
      data: {
        name: name,
        description: description,
        class_type_id: class_type_id,
        programming_language: programming_language,
        image_logo: image_logo,
      },
    });

    res.status(201).json(customResponse({ data: data, type: "create" }));
  } catch (error) {
    console.log("(SERVER API) Error Create Class", error);
  }
}
