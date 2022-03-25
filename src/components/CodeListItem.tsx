import { Cell } from "../state";
import AppBar from "./ActionBar";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";

interface CodeListProps {
  cell: Cell;
}

const CodeListItem: React.FC<CodeListProps> = ({ cell }) => {
  console.log("inside cell in tghe ");
  console.log(cell);
  let child: JSX.Element;
  if (cell.type === "code") {
    child = (
      <>
        <div className="action-bar-wrapper">
          <AppBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        {/* <div className="textEditor-wrapper"> */}
        <TextEditor cell={cell} />
        {/* <AppBar id={cell.id} /> */}
        {/* </div> */}
      </>
    );
  }
  return (
    <>
      <div className="appbar-wrapper-main">{child}</div>
    </>
  );
};

export default CodeListItem;
