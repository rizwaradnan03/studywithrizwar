import { prisma } from "@/config";
import { customResponse } from "@/lib/customResponse";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  try {
    const headers = await getServerSession(req, res, authOptions);
    const headersMail = headers.user.email;

    if (!headers) {
      throw new Error("Unauthorized");
    }
    const compareSession = await prisma.user.findFirst({
      where: {
        email: headersMail,
      },
    });

    if (!compareSession) {
      throw new Error("Unauthorized");
    }

    const userIdFromSession = compareSession.email;

    if (req.method !== "GET") {
      throw new Error("Method not allowed");
    }

    const cekSlug = req.query;
    const userEmail = cekSlug.slug ? cekSlug.slug[0] : null;
    const userClassId = cekSlug.slug ? cekSlug.slug[1] : null;
    const programmingLanguage = cekSlug.slug ? cekSlug.slug[2] : null;
    const page = cekSlug.slug ? cekSlug.slug[3] : null;

    const checkUserEmailById = await prisma.user.findFirst({
      where: {
        email: userEmail,
      },
    });

    console.log("isi email", checkUserEmailById);

    const checkUserEmailFromServerSession = await prisma.user.findFirst({
      where: {
        email: userIdFromSession,
      },
    });

    if (checkUserEmailById.id !== checkUserEmailFromServerSession.id) {
      throw new Error("User Did Not Have Permission");
    }

    const checkIsTakenClass = await prisma.user_class.findUnique({
      where: { id: userClassId },
    });

    if (!checkIsTakenClass) {
      throw new Error("User Did Not Have Permission");
    }

    const matchClassExerciseByClassId = await prisma.class_exercise.findFirst({
      where: {
        classs_id: checkIsTakenClass.classs_id,
        order: page,
      },
    });

    if (!matchClassExerciseByClassId) {
      throw new Error("Class Exercise Did Not Match");
    }

    const checkCurrentPage = await prisma.user_class_exercise.findFirst({
      where: {
        user_id: checkIsTakenClass.user_id,
        order: page,
        programming_language: programmingLanguage,
      },
    });

    if (!checkCurrentPage) {
      throw new Error("Wrong Api To Compare");
    }

    const data = {
      ...checkCurrentPage,
      class_exercise: matchClassExerciseByClassId,
    };

    res.status(201).json(customResponse({ data: data, type: "find" }));
  } catch (error) {
    console.log("(SERVER API) Error Comparing Param Data User Class", error);
    res.status(404).json({
      message: error.message || "An unexpected error occurred",
    });
  }
}
