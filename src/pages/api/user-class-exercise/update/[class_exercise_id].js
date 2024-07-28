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

  const userId = compareSession.id;

  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { class_exercise_id } = req.query;
    const { result } = req.body;

    const findUserClassExercise = await prisma.user_class_exercise.findFirst({
      where: { user_id: userId, class_exercise_id: class_exercise_id },
    });

    const data = await prisma.user_class_exercise.update({
      data: {
        result: result,
      },
      where: {
        id: findUserClassExercise.id,
      },
    });

    res.status(201).json(customResponse({ data: data, type: "update" }));
  } catch (error) {
    console.log("(SERVER API) Error Update User Class Exercise", error);
  }
}
