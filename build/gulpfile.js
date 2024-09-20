import { parallel, series } from "gulp";
import { copyFile, mkdir } from "fs/promises";
import path from "path";
import { leOutput, projRoot,lePackage } from "./constants.js";
import { withTaskName, run } from "./utils.js";
import buildFullBundle from "./build.js";

export const copyFiles = () =>
  Promise.all([
    copyFile(
      lePackage,
      path.resolve(leOutput, "package.json")
    ),
    copyFile(
      path.resolve(projRoot, "README.md"),
      path.resolve(leOutput, "README.md")
    ),
  ]);

export default series(
  withTaskName("clean", () => run("pnpm run clean")),
  withTaskName("createOutput", () => mkdir(leOutput, { recursive: true })),

  parallel(withTaskName("buildFullBundle", buildFullBundle)),

  copyFiles
);
