// import React, { useEffect, useRef } from "react";

// interface PreviewProps {
//   code: string;
// }

// const html = `
//     <html>
//     <head></head>
//     <body>
//         <div id='root'></div>
//         <script>
//             window.addEventListener('message', (e) => {
//                 try{
//                 eval(e.data);
//                 } catch(err){
//                     const root = document.getElementById('root');
//                     root.innerHTML = '<div style="color: red"><h2>Runtime Error</h2>' + err + '</div>'
//                 conosle.error(err);
//                 }

//             }, false );
//             </script>
//     </html>
//     `;

// const Preview: React.FC<PreviewProps> = ({ code }) => {
//   const iframe = useRef<any>();
//   useEffect(() => {
//     console.log("inside the fucking useEffect");
//     if (iframe.current && iframe) {
//       console.log("changing the iframe");
//       iframe.current.srcdoc = html;
//       iframe.current.contentWindow.postMessage(code, "*");
//     }
//   }, [code]);

//   return (
//     <iframe
//       title="preView"
//       sandbox="allow-scripts"
//       srcDoc={html}
//       ref={iframe}
//     />
//   );
// };

// export default Preview;

import { useRef, useEffect } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  // setCode: React.Dispatch<SetStateAction<string>>;
  bundlingStatus: string;
}

const html = `
    <html>
      <head>
      <style>html{background: white;}</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
        const handleError = (err) => {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
        };
        window.addEventListener("error", (e) => {
          e.preventDefault();
          console.log(e.error);
          handleError(e.error)
        });
         window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, bundlingStatus }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div id="iframe-wrapper">
      {bundlingStatus && (
        <span
          style={{
            position: "absolute",
            top: "10px",
            left: "0",
            background: "transparent",
            color: "red",
          }}
        >
          {bundlingStatus}
        </span>
      )}
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

export default Preview;
