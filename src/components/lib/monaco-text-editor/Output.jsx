import { ExecuteCode } from "@/api/code-editor/ExecuteCode";
import { Button } from "flowbite-react";
import React, { useState } from "react";

const Output = ({ editorRef }) => {
    const [output, setOutput] = useState("")

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      const run = await ExecuteCode("javascript", sourceCode);

      setOutput(run.run.output)
    } catch (error) {
      console.log("(CLIENT) Error Running Code", error);
    }
  };

  return (
    <>
      <Button onClick={() => runCode()} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-5">
        Run Code
      </Button>
      {
        output ? output : 'Click Run To See The Output Here'
      }
    </>
  );
};

export default Output;
