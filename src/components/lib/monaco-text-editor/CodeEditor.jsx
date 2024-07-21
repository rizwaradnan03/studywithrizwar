import { Editor } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import Output from "./Output";

const CodeEditor = ({ theme, programmingLanguage }) => {
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
          defaultLanguage="javascript"
          language={programmingLanguage}
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
    </>
  );
};

export default CodeEditor;
