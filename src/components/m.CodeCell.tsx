import { useEffect, useState } from "react";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import bundle from "../bundle";
import CodeEditor from "../components/CodeEditor";
import Preview from "../components/preview";
import Resizeable from "./Resizeable";

const McodeCell = () => {
  const [code, setCode] = useState<string>("");
  const [input, setInput] = useState<string>("");
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
            onChange={(value) => setInput(value)}
          />
          {/* <button type="button" onClick={handleClick}>
            Submit
          </button> */}
          {/* {!collapse && <Preview code={code} bundlingStatus={error} />} */}
        </div>
      </Resizeable>
      <Resizeable direction="vertical">
        <Preview code={code} bundlingStatus={error} />
      </Resizeable>
    </>
  );
};

export default McodeCell;
