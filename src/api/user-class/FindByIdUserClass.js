import { ApiManager } from "../ApiManager";

export const FindUserClassById = async ({ id }) => {
  try {
    const data = await ApiManager(`/user-class/find/find-by-id/${id}`);

    return data.data;
  } catch (error) {
    console.log("(CLIENT API) Error Find By Id User Class", error);
  }
};
