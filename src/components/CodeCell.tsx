import { useEffect, useState } from "react";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import bundle from "../bundle";
import CodeEditor from "../components/CodeEditor";
import Preview from "../components/preview";
import Resizeable from "./Resizeable";
import McodeCell from "./m.CodeCell";

const CodeCell = () => {
  const [code, setCode] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [collapse, setCollapse] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // const handleClick = async () => {
  //   console.log("inside bundle");
  //   console.log("input: " + input);
  //   const transpiledCode = await bundle(input);
  //   setCode(transpiledCode);
  //   // console.log(code);
  // };
  useEffect(() => {
    const timer = setTimeout(async () => {
      const transpiledCode = await bundle(input);
      setCode(transpiledCode.code);
      setError(transpiledCode.error);
    }, 1000);
    return () => clearTimeout(timer);
  }, [input]);

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

  const defaultValue = "const a = 1";
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
                defaultValue={defaultValue}
                onChange={(value) => setInput(value)}
              />
            </Resizeable>
            {/* {!collapse && <Preview code={code} bundlingStatus={error} />} */}
            <Preview code={code} bundlingStatus={error} />
          </div>
        </Resizeable>
      ) : (
        <McodeCell />
      )}
    </>
  );
};

export default CodeCell;
