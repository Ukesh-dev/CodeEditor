import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => ({
  name: "unpkgplugin",
  setup(build: esbuild.PluginBuild) {
    build.onResolve({ filter: /(^index\.js$)/ }, () => {
      console.log("resovle 1");
      return {
        path: "index.js",
        namespace: "a",
      };
    });
    build.onResolve({ filter: /^\.+\// }, async (args) => {
      console.log("resovle 2");
      return {
        path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
        // path: new URL(args.path, `${args.importer}/`).href,
        namespace: "a",
      };
    });
    build.onResolve({ filter: /.*/ }, async (args: any) =>
      // if (args.path === 'index.js') {
      //     return { path: args.path, namespace: 'a' };
      // }
      // if (args.path.includes('../') || args.path.includes('./')) {
      //     return {
      //         path: new URL(
      //             args.path,
      //             `https://unpkg.com${args.resolveDir}/`
      //         ).href,
      //         // path: new URL(args.path, `${args.importer}/`).href,
      //         namespace: 'a',
      //     };
      // }
      ({
        path: `https://unpkg.com/${args.path}`,
        namespace: "a",
      })
    );
  },
});
