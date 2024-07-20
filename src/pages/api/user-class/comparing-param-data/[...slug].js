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
    const cekSlug = req.query;
    const userClassId = cekSlug.slug ? cekSlug.slug[0] : null;
    const programmingLanguage = cekSlug.slug ? cekSlug.slug[1] : null;
    const page = cekSlug.slug ? cekSlug.slug[2] : null;

    const checkIsTakenClass = await prisma.user_class.findUnique({
      where: { id: userClassId },
    });

    if (!checkIsTakenClass) {
      return res.status(405).json({ message: "User Did Not Have Permission" });
    }

    const checkCurrentPage = await prisma.user_class_exercise.findFirst({
      where: {
        user_id: checkIsTakenClass.user_id,
        order: page,
        programming_language: programmingLanguage,
      },
      include: {
        class_exercise: true,
      },
    });

    console.log("isi current page", checkCurrentPage);

    if (!checkIsTakenClass) {
      return res.status(405).json({ message: "Wrong Api To Compare" });
    }

    res
      .status(201)
      .json(customResponse({ data: checkCurrentPage, type: "find" }));
  } catch (error) {
    console.log("(SERVER API) Error Comparing Param Data User Class", error);
  }
}
