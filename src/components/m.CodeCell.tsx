import { useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import Preview from "../components/preview";
import { useActions } from "../hooks/useActionCreator";
import Resizeable from "./Resizeable";
import { CellProps } from "./CodeCell";
import { useTypedSelector } from "../hooks/useTypedSelector";

const McodeCell: React.FC<CellProps> = ({ cell }) => {
  const { updateCell, bundleAction } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const data = useTypedSelector((state) => {
    const cumulativeCode = [];

    const { order, data } = state.cells;
    const orderedCell = order.map((id) => data[id]);

    for (let c of orderedCell) {
      if (c.type === "code") {
        cumulativeCode.push(c.content);
      }
      if (c.id === cell.id) {
        break;
      }
    }
    return cumulativeCode;
  });

  // const handleClick = async () => {
  //   console.log("inside bundle");
  //   console.log("input: " + input);
  //   const transpiledCode = await bundle(input);
  //   setCode(transpiledCode);
  //   // console.log(code);
  // };

  useEffect(() => {
    if (!bundle) {
      bundleAction(cell.id, data.join("\n"));
      return;
    }
    const timer = setTimeout(async () => {
      bundleAction(cell.id, data.join("\n"));
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.join("\n"), cell.id, bundleAction]);

  const defaultValue = "const a = 1";
  return (
    <>
      {/* //! from here to */}
      {/* <Resizeable direction="vertical" collapse={collapse}>
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100%",
          }}
          className="resizeWindow"
        >
          <Resizeable direction="horizontal" collapse={collapse}>
            <CodeEditor
              defaultValue={defaultValue}
              onChange={(value) => setInput(value)}
            />
          </Resizeable>
          {/* {!collapse && <Preview code={code} bundlingStatus={error} />} */}
      {/* <Preview code={code} bundlingStatus={error} />
        </div>
      </Resizeable> */}
      {/* {collapse && <Preview code={code} bundlingStatus={error} />} */}
      <Resizeable direction="vertical">
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "calc(100% - 10px)",
          }}
          className="resizeWindow"
        >
          <CodeEditor
            defaultValue={defaultValue}
            onChange={(value) => updateCell(cell.id, value)}
          />
          {/* <button type="button" onClick={handleClick}>
            Submit
          </button> */}
          {/* {!collapse && <Preview code={code} bundlingStatus={error} />} */}
        </div>
      </Resizeable>
      <Resizeable direction="vertical">
        {bundle && <Preview code={bundle.code} bundlingStatus={bundle.err} />}
      </Resizeable>
    </>
  );
};

export default McodeCell;
