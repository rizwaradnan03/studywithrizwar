import { prisma } from "@/config";
import { customResponse } from "@/lib/customResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import nodemailer from "nodemailer";
import RegisterClass from "@/components/web/email/RegisterClass";
import { renderToString } from "react-dom/server";

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
  const userName = compareSession.name;
  const userEmail = compareSession.email;

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

    if (!data) {
      return res.status(405).json({ message: "Failed Register Class" });
    }

    const findClass = await prisma.classs.findUnique({
      where: { id: data.classs_id },
    });

    if (!findClass) {
      return res.status(405).json({ message: "Failed Find Class" });
    }

    const findClassExercise = await prisma.class_exercise.findMany({
      where: {
        classs_id: data.classs_id,
      },
      orderBy: {
        order: "asc",
      },
    });

    if (!findClassExercise) {
      return res.status(405).json({ message: "Failed Find Class Exercise" });
    }

    const filterClassExercise = findClassExercise.map((item) => {
      return {
        user_id: userId,
        class_exercise_id: item.id,
        order: item.order,
        programming_language: findClass.programming_language,
      };
    });

    for (let i = 0; i < filterClassExercise.length; i++) {
      await prisma.user_class_exercise.create({
        data: {
          user_id: filterClassExercise[i].user_id,
          class_exercise_id: filterClassExercise[i].class_exercise_id,
          order: filterClassExercise[i].order,
          programming_language: filterClassExercise[i].programming_language,
        },
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const htmlContent = renderToString(
      <RegisterClass name={userName} class={findClass.name} />
    );

    const send = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: userEmail,
      subject: "Berhasil Mengambil Kelas!",
      html: htmlContent,
    });

    if (!data) {
      return res.status(405).json({ message: "Failed Send Mail" });
    }

    res.status(201).json(customResponse({ data: data, type: "create" }));
  } catch (error) {
    console.log("(SERVER API) Error Create User Class", error);
  }
}
