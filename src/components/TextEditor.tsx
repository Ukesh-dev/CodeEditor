import MdEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import { useActions } from "../hooks/useActionCreator";
import { Cell } from "../state";
import AppBar from "./ActionBar";
import "./textEditor.css";

const TextEditor: React.FC<{ cell: Cell }> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>("# Hello World!");
  const { updateCell } = useActions();

  useEffect(() => {
    // document.documentElement.setAttribute("data-color-mode", "dark");
    const listener = (e: MouseEvent) => {
      if (ref.current && ref.current.contains(e.target as Node)) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () =>
      document.removeEventListener("click", listener, { capture: true });
  }, []);

  if (editing) {
    return (
      <div ref={ref}>
        <MdEditor
          value={cell.content}
          onChange={(val) => updateCell(cell.id, val || "Click to Add")}
        />
      </div>
    );
  }
  return (
    <div className="textEditor-wrapper">
      <div className="card-content" onClick={() => setEditing(true)}>
        <MdEditor.Markdown source={cell.content || "Click To Add"} />
      </div>
      <AppBar id={cell.id} />
    </div>
  );
};

export default TextEditor;
