import { ApiManager } from "../ApiManager";

export const FindHasTakenOrNotUserClass = async ({ id }) => {
  try {
    const data = await ApiManager(
      `/user-class/find/find-has-taken-or-not/${id}`
    );

    return data.data;
  } catch (error) {
    console.log("(CLIENT API) Error Find Has Taken Or Not User Class", error);
    throw new error('(SERVER API) Error')
  }
};
