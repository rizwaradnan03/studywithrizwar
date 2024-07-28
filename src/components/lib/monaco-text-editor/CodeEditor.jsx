import { Editor } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import Output from "./Output";

const CodeEditor = ({
  theme,
  programmingLanguage,
  code,
  setCode,
  output,
  setOutput,
  isCodeSubmitted,
  setIsCodeSubmitted,
}) => {
  const editorRef = useRef(null);
  // const [value, setValue] = useState("");
  // console.log('isi editor ref', editorRef)

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <>
      <div className="w-full lg:w-2/4">
        <Editor
          height="65vh"
          defaultLanguage={programmingLanguage}
          language={programmingLanguage}
          defaultValue=""
          theme="vs-dark"
          onMount={onMount}
          value={code}
          onChange={(code) => setCode(code)}
        />
      </div>
      <div className="w-full lg:w-1/4">
        <Output
          programmingLanguage={programmingLanguage}
          editorRef={editorRef}
          output={output}
          setOutput={setOutput}
          isCodeSubmitted={isCodeSubmitted}
          setIsCodeSubmitted={setIsCodeSubmitted}
        />
      </div>
    </>
  );
};

export default CodeEditor;
