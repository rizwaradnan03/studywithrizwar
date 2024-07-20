import { ApiManager } from "../ApiManager";

export const FindAllClassType = async () => {
  try {
    const data = await ApiManager(`/class-type/find/find-all/`);
    return data.data;
  } catch (error) {
    console.log("(CLIENT API) Error Find All Class Type", error);
  }
};
