import "./progressBar.css";
import { useEffect, useState } from "react";
// import "bulmaswatch/superhero/bulmaswatch.min.css";
import CodeEditor from "../components/CodeEditor";
import Preview from "../components/preview";
import Resizeable from "./Resizeable";
// import McodeCell from "./m.CodeCell";
import { useActions } from "../hooks/useActionCreator";
import { Cell } from "../state";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useCumulativeCode } from "../hooks/useCumulativeCode";

export interface CellProps {
  cell: Cell;
}

const CodeCell: React.FC<CellProps> = ({ cell }) => {
  // const [collapse, setCollapse] = useState<boolean>(true);
  const { updateCell, bundleAction } = useActions();

  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cellOrder = useTypedSelector((state) => state.cells.order);
  // console.log(cellOrder);
  const cumulativeCode = useCumulativeCode(cell.id);

  // const handleClick = async () => {
  //   console.log("inside bundle");
  //   console.log("input: " + input);
  //   const transpiledCode = await bundle(input);
  //   setCode(transpiledCode);
  //   // console.log(code);
  // };

  useEffect(() => {
    // console.log("I am bundling *******");
    if (!bundle) {
      bundleAction(cell.id, cumulativeCode);
      return;
    }
    const timer = setTimeout(async () => {
      bundleAction(cell.id, cumulativeCode);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cellOrder, bundleAction]);

  // useEffect(() => {
  //   const mq = window.matchMedia("(max-width: 500px)");
  //   const myFunc = () => {
  //     if (mq.matches) {
  //       setCollapse(true);
  //     } else {
  //       setCollapse(false);
  //     }
  //   };
  //   myFunc();
  //   window.addEventListener("resize", myFunc);
  //   return () => {
  //     window.removeEventListener("resize", myFunc);
  //   };
  // }, []);

  const [height, setHeight] = useState<number>(40);

  // const defaultValue = "const a = 1";
  return (
    <>
      {/* //! from here to */}
      {/* {!collapse ? ( */}
      <Resizeable direction="vertical" height={height} setHeight={setHeight}>
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100%",
          }}
          className="resizeWindow"
        >
          <Resizeable
            direction="horizontal"
            height={height}
            setHeight={setHeight}
          >
            <CodeEditor
              height={height}
              setHeight={setHeight}
              defaultValue={cell.content}
              onChange={(value) => updateCell(cell.id, value)}
            />
          </Resizeable>
          {/* {!collapse && <Preview code={code} bundlingStatus={error} />} */}
          <div className="progress-bar-cover">
            {!bundle || bundle.loading ? (
              <div className="progress-bar-wrapper">
                <progress className="progress is-small is-primary"></progress>
              </div>
            ) : (
              bundle && (
                <Preview code={bundle.code} bundlingStatus={bundle.err} />
              )
            )}
          </div>
        </div>
      </Resizeable>
    </>
    // // : (
    //   <McodeCell cell={cell} />
    // )} */}
  );
};

export default CodeCell;
