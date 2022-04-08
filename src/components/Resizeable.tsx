import React, { Dispatch, useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  height: number;
  setHeight: Dispatch<React.SetStateAction<number>>;
}

const Resizeable: React.FC<ResizableProps> = ({
  children,
  direction,
  height,
  setHeight,
}) => {
  let resizableProps: ResizableBoxProps;
  // const [height, setHeight] = useState<number>(20 * 5);
  const [width, setWidth] = useState(window.innerWidth * 0.55);
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 50);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      height: Infinity,
      width,
      resizeHandles: ["e"],
      minConstraints: [innerWidth * 0.29, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity], //! It needs to be same every where else or else you are gonna face some bugs that will make you wanna cry.
      onResizeStop: (e, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      className: "resize-vertical",
      width: Infinity,
      height,
      resizeHandles: ["s"],
      minConstraints: [Infinity, 40],
      maxConstraints: [Infinity, innerHeight * 0.9],
      // onResize: (e, data) => {
      //   setHeight(data.size.height);
      // },
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizeable;
