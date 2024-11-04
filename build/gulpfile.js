import { parallel, series, src, dest } from "gulp";
import { copyFile, mkdir } from "fs/promises";
import path from "path";
import { leOutput, projRoot, lePackage } from "./constants.js";
import { withTaskName, run } from "./utils.js";
import buildFullBundle from "./build.js";

const sourceTemplatesFolder = path.resolve(projRoot, "src/templates/*.hbs");
const templatesFolder = path.resolve(leOutput, "templates");

export const copyFiles = () =>
  Promise.all([
    copyFile(lePackage, path.resolve(leOutput, "package.json")),
    copyFile(
      path.resolve(projRoot, "README.md"),
      path.resolve(leOutput, "README.md")
    ),
  ]);

export default series(
  withTaskName("clean", () => run("pnpm run clean")),
  withTaskName("createOutput", () => mkdir(leOutput, { recursive: true })),

  withTaskName("buildFullBundle", buildFullBundle),

  parallel(
    copyFiles,
    withTaskName("copyTemplatesFolder", () =>
      src(sourceTemplatesFolder).pipe(dest(templatesFolder))
    )
  )
);
