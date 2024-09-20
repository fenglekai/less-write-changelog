import path from "path";
import gulp from "gulp";
import { rollup } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import esbuild, { minify as minifyPlugin } from "rollup-plugin-esbuild";
import json from "@rollup/plugin-json";
import { target, banner, leOutput, projRoot } from "./constants.js";
import {
  writeBundles,
  formatBundleFilename,
  withTaskName,
} from "./utils.js";

async function buildFullEntry(minify) {
  const plugins = [
    commonjs(),
    json(),
    esbuild({
      exclude: [],
      sourceMap: minify,
      target,
      treeShaking: true,
      legalComments: "eof",
    }),
  ];
  if (minify) {
    plugins.push(
      minifyPlugin({
        target,
        sourceMap: true,
      })
    );
  }

  const bundle = await rollup({
    input: path.resolve(projRoot, "src/index.js"),
    plugins,
    treeshake: true,
  });
  await writeBundles(bundle, [
    {
      format: "umd",
      file: path.resolve(
        leOutput,
        formatBundleFilename("index.full", minify, "js")
      ),
      exports: "named",
      name: "LessWriteChangelog",
      sourcemap: minify,
      banner,
    },
    {
      format: "esm",
      file: path.resolve(
        leOutput,
        formatBundleFilename("index.full", minify, "mjs")
      ),
      sourcemap: minify,
      banner,
    },
  ]);
}

const buildFullBundle = gulp.parallel(
  withTaskName("buildFullMinified", () => buildFullEntry(true)),
  withTaskName("buildFull", () => buildFullEntry(false))
);

export default buildFullBundle;
