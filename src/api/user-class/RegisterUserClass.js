import { ApiManager } from "../ApiManager";

export const RegisterUserClass = async ({ class_id }) => {
  try {
    const data = await ApiManager(`/user-class/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        class_id: class_id,
      },
    });

    return data.data;
  } catch (error) {
    console.log("(CLIENT API) Error Register User Class", error);
  }
};
