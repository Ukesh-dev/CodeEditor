import "./code-editor.css";
import "./syntax.css";
import Editor, { Monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useRef } from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
// import { parse } from "@babel/parser";
// import traverse from "@babel/traverse";
// import MonacoJSXHighlighter from "monaco-jsx-highlighter";

interface CodeEditorProps {
  defaultValue: string;
  onChange(value: string): void;
}

function CodeEditor({ defaultValue, onChange }: CodeEditorProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  // const monacoJSXHighlighterRef = useRef<any>();
  const handleEditorChange = (
    value: string | undefined,
    event: monaco.editor.IModelContentChangedEvent
  ) => {
    if (value) {
      onChange(value);
    }
  };

  // const markdownModel = monaco.editor.createModel("", "markdown");
  // const styleModel = monaco.editor.createModel("", "css");
  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editorRef.current = editor;
  };
  const onClickFormat = () => {
    const unformatted = editorRef?.current?.getValue();
    if (unformatted) {
      const formatted = prettier
        .format(unformatted, {
          parser: "babel",
          plugins: [parser],
          useTabs: false,
          semi: true,
          singleQuote: true,
        })
        .replace(/\n$/, "");
      editorRef?.current?.setValue(formatted);
    }
  };
  return (
    <div className="editor-wrapper">
      <button
        type="button"
        className="button button-format is-primary is-small"
        onClick={onClickFormat}
      >
        Format
      </button>
      <Editor
        height="100%"
        width="100%"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        defaultLanguage="javascript"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        defaultValue={defaultValue}
      />
    </div>
  );
}
export default CodeEditor;

// ! Edited from here so uncomment above this to uncomment
