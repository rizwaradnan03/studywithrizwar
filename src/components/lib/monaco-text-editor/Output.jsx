import { ExecuteCode } from "@/api/code-editor/ExecuteCode";
import { Box } from "@chakra-ui/react";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";

const Output = ({
  programmingLanguage,
  editorRef,
  output,
  setOutput,
  isCodeSubmitted,
  setIsCodeSubmitted,
}) => {
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      const run = await ExecuteCode(programmingLanguage, sourceCode);

      setOutput(run.run.output);
      // setIsCodeRunning(true);
    } catch (error) {
      console.log("(CLIENT) Error Running Code", error);
    }
  };

  return (
    <>
      <div className="flex">
        <Button
          onClick={() => runCode()}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2.5 py-1.4 text-center me-2 mb-5"
        >
          Jalankan Kode
        </Button>
        {output ? (
          <Button
            onClick={() => setIsCodeSubmitted(true)}
            className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2.5 py-1.4 text-center me-2 mb-5"
          >
            Submit
          </Button>
        ) : null}
      </div>
      <Box
        height={"60vh"}
        p={2}
        border={"1px solid"}
        borderRadius={4}
        borderColor={"#333"}
        padding={10}
        overflow="auto"
        bgcolor="#f0f0f0"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      >
        {output ? output : "Tekan Jalankan Kode Untuk Melihat Hasil"}
      </Box>
    </>
  );
};

export default Output;
