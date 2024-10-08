import { ApiManager } from "../ApiManager";

export const ComparingParamDataUserClass = async ({
  user_email,
  user_class_id,
  programming_language,
  order,
}) => {
  try {
    const data = await ApiManager(
      `/user-class/comparing-param-data/${user_email}/${user_class_id}/${programming_language}/${order}`
    );

    return data.data;
  } catch (error) {
    console.log("(CLIENT API) Error Comparing Param Data User Class", error);
    throw new error("(SERVER API) Error");
  }
};
