import { ApiManager } from "../ApiManager";

export const FindAllTakenClass= async () => {
  try {
    const data = await ApiManager(
      `/class/find/find-all-taken-class/`
    );

    return data.data;
  } catch (error) {
    console.log("(CLIENT API) Error Find All Taken Class", error);
  }
};
