import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import visualizer from "rollup-plugin-visualizer";
import typescript from "@rollup/plugin-typescript";
import ts from "typescript";
import json from "@rollup/plugin-json";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

import { getFiles } from "./scripts/buildUtils";

const extensions = [".js", ".ts", ".jsx", ".tsx"];

export default [
  {
    input: ["./src/index.ts", ...getFiles("./src", extensions, [])],
    output: [
      {
        dir: "lib",
        format: "es",
        preserveModules: true,
        preserveModulesRoot: "lib",
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      terser(),
      typescript({
        typescript: ts,
        tsconfig: "./tsconfig.build.json",
        declaration: true,
        declarationDir: "lib",
        exclude: [
          "**/*.spec.ts",
          "**/*.test.ts",
          "**/*.stories.ts",
          "**/*.spec.tsx",
          "**/*.test.tsx",
          "**/*.stories.tsx",
          "node_modules",
          "lib",
        ],
      }),
      json(),
      visualizer({
        filename: "bundle-analysis.html",
        open: false,
      }),
    ],
    external: [
      "react",
      "react-dom",
      "react-i18next",
      "classnames",
      "lodash",
      "antd",
      "react-qr-code",
      "react-select",
      "use-clipboard-copy",
      "react-paginate",
      "react-spinners",
    ],
  },
];
