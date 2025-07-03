import ts from "typescript";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

import { getFiles } from "./scripts/build-utils";

const extensions = [".js", ".ts", ".jsx", ".tsx"];

const inputFiles = ["./src/index.ts", ...getFiles("./src", extensions, [])];

const externalPackages = [];
const tsExcludeList = ["node_modules", "lib"];

export default [
  {
    input: inputFiles,
    output: [
      {
        dir: "./lib/esm",
        format: "esm",
        preserveModules: true,
        preserveModulesRoot: "src",
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
        outDir: "lib/esm",
        declarationDir: "lib/esm",
        exclude: tsExcludeList,
      }),
      json(),
    ],
    external: externalPackages,
  },

  {
    input: inputFiles,
    output: [
      {
        dir: "./lib/cjs",
        format: "cjs",
        preserveModules: true,
        preserveModulesRoot: "src",
        exports: "named",
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
        outDir: "lib/cjs",
        declarationDir: "lib/cjs",
        exclude: tsExcludeList,
      }),
      json(),
    ],
    external: externalPackages,
  },
];
