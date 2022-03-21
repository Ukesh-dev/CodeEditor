import * as esbuild from "esbuild-wasm";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

let service: esbuild.Service;

const bundle = async (rawCode: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      // wasmURL: '/esbuild.wasm',
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }

  try {
    const transpiledCode = await service.build({
      entryPoints: ["index.js"],
      write: false,
      bundle: true,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        global: "window",
        "process.env.NODE_ENV": '"production"',
      },
    });
    return { code: transpiledCode.outputFiles[0].text, error: "" };
  } catch (error) {
    return { code: "", error: `${error}` };
  }
};

export default bundle;
