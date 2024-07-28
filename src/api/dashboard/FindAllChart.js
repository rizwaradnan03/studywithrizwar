import { ApiManager } from "../ApiManager";

export const FindAllChart = async () => {
  try {
    const data = await ApiManager(`/dashboard/chart/find-all`);

    return data.data;
  } catch (error) {
    console.log("(CLIENT API) Error Find All User Class", error);
    throw new error("(SERVER API) Error");
  }
};
