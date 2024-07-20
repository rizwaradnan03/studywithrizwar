import { Editor } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const [value, setValue] = useState("");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row mb-10">
        <div className="w-full lg:w-2/4">
          <Editor
            height="90vh"
            defaultLanguage="javascript"
            defaultValue="// type your code here"
            theme="vs-dark"
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </div>
        <div className="w-full lg:w-1/4">
          <Output editorRef={editorRef} />
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
