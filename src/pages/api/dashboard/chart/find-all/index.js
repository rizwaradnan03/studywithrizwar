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

  const userId = compareSession.id;

  if (!compareSession) {
    return res.status(405).json({ message: "Unauthorized" });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const classTaken = await prisma.user_class.findMany({
      where: {
        user_id: userId,
      },
      include: {
        classs: true,
      },
    });

    console.log("isin class taken", classTaken);

    let classExerciseArrayData = [];
    for (let i = 0; i < classTaken.length; i++) {
      const classExercise = await prisma.class_exercise.findMany({
        where: {
          classs_id: classTaken[i].classs_id,
        },
        include: {
          classs: true,
        },
      });

      classExerciseArrayData.push(classExercise);
    }

    console.log("isi class exercise array data", classExerciseArrayData);

    let userClassExerciseData = [];
    for (let i = 0; i < classExerciseArrayData.length; i++) {
      let className;
      let totalNotNull = 0;
      let totalIsNull = 0;
      for (let j = 0; j < classExerciseArrayData[i].length; j++) {
        const notNull = await prisma.user_class_exercise.count({
          where: {
            class_exercise_id: classExerciseArrayData[i][j].id,
            result: {
              not: null,
              not: "",
            },
          },
        });

        const isNull = await prisma.user_class_exercise.count({
          where: {
            class_exercise_id: classExerciseArrayData[i][j].id,
            OR: [{ result: null }, { result: "" }],
          },
        });

        totalNotNull += notNull;
        totalIsNull += isNull;
        className = classExerciseArrayData[i][j].classs.name;
      }
      const templateCode = {
        class_title: className,
        data: [
          {
            name: "Sudah",
            count: totalNotNull,
          },
          {
            name: "Belum",
            count: totalIsNull,
          },
        ],
      };

      userClassExerciseData.push(templateCode);
    }

    res
      .status(201)
      .json(customResponse({ data: userClassExerciseData, type: "find" }));
  } catch (error) {
    console.log("(SERVER API) Error Chart", error);
  }
}
