import { Provider } from "react-redux";
import { store } from "./state";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import CodeList from "./components/CodeList";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <CodeList />
      </Provider>
    </>
  );
};

export default App;

//! Raw Code that can be helpful for the beginners. I guess !!!

// import * as esbuild from "esbuild-wasm";
// import { useEffect, useRef, useState } from "react";
// import { unpkgPathPlugin } from "./bundle/plugins/unpkg-path-plugin";
// import { fetchPlugin } from "./bundle/plugins/fetch-plugin";
// import CodeEditor from "./components/CodeEditor";
// import "bulmaswatch/superhero/bulmaswatch.min.css";
// import Preview from "./components/preview";
// import Bundle from "./bundle";

// const App = () => {
//   // const { data: datas } = useTypedSelector(
//   //     (state) => state.searchRepoReducer
//   // );
//   const [code, setCode] = useState<string>("");
//   const [input, setInput] = useState<string>("");
//   const ref = useRef<any>();
//   const iframe = useRef<any>();
//   // console.log(datas);

//   const startService = async () => {
//     ref.current = await esbuild.startService({
//       worker: true,
//       // wasmURL: '/esbuild.wasm',
//       wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
//     });
//   };

//   useEffect(() => {
//     startService();
//   }, []);
//   const onClick = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // searchRepoAction();
//     // if (!ref.current) {
//     //   return;
//     // }
//     console.log(ref.current);
//     // eslint-disable-next-line no-use-before-define
//     iframe.current.srcdoc = html;
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
//     // const transpiledCode = await ref.current.build({
//     //   entryPoints: ["index.js"],
//     //   write: false,
//     //   bundle: true,
//     //   plugins: [unpkgPathPlugin(), fetchPlugin(input)],
//     //   define: {
//     //     global: "window" || "global",
//     //     "process.env.NODE_ENV": '"production"',
//     //   },
//     // });
//     const transpiledCode = await Bundle(input);
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
//     // const transpiledCode = await ref.current.transform(input, {
//     //     loader: 'jsx',
//     //     target: 'es2015',
//     // });
//     // console.log(transpiledCode);
//     // console.log(transpiledCode.outFiles[0]);
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
//     // setCode(transpiledCode.outputFiles[0].text);
//     // iframe.current.contentWindow.postMessage(
//     //   transpiledCode.outputFiles[0].text,
//     //   "*"
//     // );

//     setCode(transpiledCode.outputFiles[0].text);
//   };
//   // ! We don't do this because the browser tries to find closing Script tag and causes error in some library where script tag in used like ReactDOM
//   // const html = `
//   // <script>${code}</script>
//   // `;
//   const html = `
//     <html>
//     <head></head>
//     <body>
//         <div id='root'></div>
//         <script>
//             window.addEventListener('message', (e) => {
//                 try{
//                 eval(e.data);
//                 }catch(err){
//                     const root = document.getElementById('root');
//                     root.innerHTML = '<div style="color: red"><h2>Runtime Error</h2>' + err + '</div>'
//                     console.error(err);
//                 }
//             }, false );
//             </script>
//     </html>
//     `;
//   return (
//     <div>
//       <CodeEditor
//         defaultValue="const a = 1;"
//         onChange={(value) => setInput(value)}
//       />
//       <form>
//         {/* <textarea value={input} onChange={(e) => setInput(e.target.value)} /> */}
//         <button type="submit" onClick={(e) => onClick(e)}>
//           Click me
//         </button>
//       </form>
//       {/* <pre>{code}</pre> */}
//       <Preview code={code} />
//       {/* <iframe
//         ref={iframe}
//         srcDoc={html}
//         sandbox="allow-scripts"
//         title="CodeSandbox"
//       /> */}
//     </div>
//   );
// };

// export default App;
