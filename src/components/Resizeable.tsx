import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}

const Resizeable: React.FC<ResizableProps> = ({ children, direction }) => {
  let resizableProps: ResizableBoxProps;
  const [width, setWidth] = useState(window.innerWidth * 0.75);
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    let timer: any;
    let cancel = false;
    const listener = () => {
      if (cancel) {
        return;
      }
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
      cancel = true;
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
      height: 400,
      resizeHandles: ["s"],
      minConstraints: [Infinity, 40],
      maxConstraints: [Infinity, innerHeight * 0.9],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizeable;
