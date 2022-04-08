import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => ({
  name: "fetch-plugin",
  setup(build: esbuild.PluginBuild) {
    build.onLoad({ filter: /./ }, async (args: any) => {
      const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
        args.path
      );
      if (cachedResult) {
        return cachedResult;
      }
    });

    build.onLoad({ filter: /\.css$/ }, async (args: any) => {
      const { data, request } = await axios.get(args.path);
      const escapedData = data
        .replace(/"/g, '\\"')
        .replace(/\n/g, "")
        .replace(/'/g, "\\'");
      const contents = `const style = document.createElement('style');
        style.innerText = '${escapedData}'; 
        document.head.appendChild(style);
        `;
      const result: esbuild.OnLoadResult = {
        loader: "jsx",
        contents,
        resolveDir: new URL("./", request.responseURL).pathname,
      };
      await fileCache.setItem(args.path, result);

      return result;
    });

    build.onLoad({ filter: /./ }, async (args: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (args.path === "index.js") {
        return {
          loader: "jsx",
          // contents: `const message = require('react'); console.log(message)`,
          contents: inputCode,
        };
      }
      // const cachedFile = await fileCache.getItem<esbuild.OnLoadResult>(
      //     args.path
      // );
      // if (cachedFile) {
      //     console.log('in fetcdh');
      //     return cachedFile;
      // }

      const { data, request } = await axios.get(`${args.path}`);

      // const escaped = data.replace(/\n/g, '');
      // // .replace(/"/g, '\\"')
      // // .replace(/'/g, "\\'");

      // const cssInput = `const style= document.createElement('style');
      // style.innerText = '${escaped}';
      // document.head.appendChild(style);
      // `;
      // // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      // const contents = args.path.match(/.css$/) ? cssInput : data;

      const result: esbuild.OnLoadResult = {
        loader: "jsx",
        contents: data,
        resolveDir: new URL("./", request.responseURL).pathname,
      };
      await fileCache.setItem(args.path, result);
      return result;
    });
  },
});
