import { LANGUAGE_VERSION } from "@/components/lib/monaco-text-editor/LanguageVersion";
import { ApiExecuteCode } from "../ApiManager";

export const ExecuteCode = async (language, sourceCode) => {
  const data = await ApiExecuteCode(`/execute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      language: language,
      version: LANGUAGE_VERSION[language],
      files: [
        {
          content: sourceCode,
        },
      ],
    },
  });

  return data.data;
};
