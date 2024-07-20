import { ApiExecuteCode } from "../ApiManager";

export const ExecuteCode = async (language, sourceCode) => {
  const data = await ApiExecuteCode(`/execute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      language: language,
      version: "18.15.0",
      files: [
        {
          name: "mantap.js",
          content: sourceCode,
        },
      ],
    },
  });

  return data.data;
};
