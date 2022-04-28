import "./progressBar.css";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
// import "bulmaswatch/superhero/bulmaswatch.min.css";
import CodeEditor from "../components/CodeEditor";
import Preview from "../components/preview";
import { useActions } from "../hooks/useActionCreator";
import { Cell } from "../state";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useCumulativeCode } from "../hooks/useCumulativeCode";
import Mresizeable from "./m.Resizeable";

export interface CellProps {
  cell: Cell;
}
export const useSafeDispatch = (dispatch: (...args: any) => void) => {
  const mountRef = useRef(false);
  // console.log(mountRef.current);
  // const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    mountRef.current = true;
    return () => {
      mountRef.current = false;
      // setShow(false);
    };
  }, []);

  return useCallback(
    (...args) => {
      if (mountRef.current === true) {
        dispatch(...args);
        // setShow(true);
      }
      return void 0;
    },
    [dispatch]
  );
};

export const useSafeResize = () => {
  const resizeRef = useRef(false);
  let show = false;

  useLayoutEffect(() => {
    resizeRef.current = true;
    return () => {
      resizeRef.current = false;
    };
  }, []);

  if (resizeRef.current === true) {
    show = true;
  } else {
    show = false;
  }
  // console.log(`%cshow: ${show}`, "color: red; background: black;");
  return show;
};

const CodeCell: React.FC<CellProps> = ({ cell }) => {
  // const [collapse, setCollapse] = useState<boolean>(true);
  // const { updateCell: unsafeupdateCell, bundleAction: unsafebundleAction } =
  //   useActions();

  const { updateCell, bundleAction } = useActions();
  // const updateCell = useSafeDispatch(unsafeupdateCell);
  // console.log(updateCell);
  // const bundleAction = useSafeDispatch(unsafebundleAction);

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
  // const show = true;

  useEffect(() => {
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
  }, [cumulativeCode, cellOrder, bundleAction, cell.id]);

  const [height, setHeight] = useState<number>(40);

  // const defaultValue = "const a = 1";
  return (
    <>
      {/* //! from here to */}

      <Mresizeable direction="horizontal" height={height} setHeight={setHeight}>
        <div className="resizeWindow">
          <Mresizeable
            direction="vertical"
            height={height}
            setHeight={setHeight}
          >
            <CodeEditor
              height={height}
              setHeight={setHeight}
              defaultValue={cell.content}
              onChange={(value) => updateCell(cell.id, value)}
            />
          </Mresizeable>
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
      </Mresizeable>
    </>
  );
};

export default CodeCell;
