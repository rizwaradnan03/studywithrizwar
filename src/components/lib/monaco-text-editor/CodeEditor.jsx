import { Editor } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import Output from "./Output";

const CodeEditor = ({
  theme,
  programmingLanguage,
  output,
  setOutput,
  setIsCodeSubmitted,
}) => {
  const editorRef = useRef(null);
  const [value, setValue] = useState("");

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
          value={value}
          onChange={(value) => setValue(value)}
        />
      </div>
      <div className="w-full lg:w-1/4">
        <Output
          programmingLanguage={programmingLanguage}
          editorRef={editorRef}
          output={output}
          setOutput={setOutput}
          setIsCodeSubmitted={setIsCodeSubmitted}
        />
      </div>
    </>
  );
};

export default CodeEditor;
