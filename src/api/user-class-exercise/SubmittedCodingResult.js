import { ApiManager } from "../ApiManager";

export const SubmittedCodingResult = async ({ classExerciseId, result }) => {
  try {
    const data = await ApiManager(`/user-class-exercise/update/${classExerciseId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        result: result,
      },
    });

    return data.data;
  } catch (error) {
    console.log("(CLIENT API) Error User Class Exercise", error);
    throw new error("(SERVER API) Error");
  }
};
