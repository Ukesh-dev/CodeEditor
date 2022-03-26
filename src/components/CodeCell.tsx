import { useEffect, useState } from "react";
// import "bulmaswatch/superhero/bulmaswatch.min.css";
import CodeEditor from "../components/CodeEditor";
import Preview from "../components/preview";
import Resizeable from "./Resizeable";
import McodeCell from "./m.CodeCell";
import { useActions } from "../hooks/useActionCreator";
import { Cell } from "../state";
import { useTypedSelector } from "../hooks/useTypedSelector";

export interface CellProps {
  cell: Cell;
}

const CodeCell: React.FC<CellProps> = ({ cell }) => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const { updateCell, bundleAction } = useActions();

  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  // const handleClick = async () => {
  //   console.log("inside bundle");
  //   console.log("input: " + input);
  //   const transpiledCode = await bundle(input);
  //   setCode(transpiledCode);
  //   // console.log(code);
  // };

  useEffect(() => {
    if (!bundle) {
      bundleAction(cell.id, cell.content);
      return;
    }
    const timer = setTimeout(async () => {
      bundleAction(cell.id, cell.content);
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, bundleAction]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 500px)");
    const myFunc = () => {
      if (mq.matches) {
        setCollapse(true);
      } else {
        setCollapse(false);
      }
    };
    myFunc();
    window.addEventListener("resize", myFunc);
    return () => window.removeEventListener("resize", myFunc);
  }, []);

  // const defaultValue = "const a = 1";
  return (
    <>
      {/* //! from here to */}
      {!collapse ? (
        <Resizeable direction="vertical">
          <div
            style={{
              position: "relative",
              display: "flex",
              width: "100%",
              height: "100%",
            }}
            className="resizeWindow"
          >
            <Resizeable direction="horizontal">
              <CodeEditor
                defaultValue={cell.content}
                onChange={(value) => updateCell(cell.id, value)}
              />
            </Resizeable>
            {/* {!collapse && <Preview code={code} bundlingStatus={error} />} */}
            {bundle && (
              <Preview code={bundle.code} bundlingStatus={bundle.err} />
            )}
          </div>
        </Resizeable>
      ) : (
        <McodeCell cell={cell} />
      )}
    </>
  );
};

export default CodeCell;
