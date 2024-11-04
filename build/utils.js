import { spawn } from "child_process";
import chalk from "chalk";
import { projRoot } from "./constants.js";

export function writeBundles(bundle, options) {
  return Promise.all(options.map((option) => bundle.write(option)));
}

export function formatBundleFilename(name, minify, ext) {
  return `${name}${minify ? ".min" : ""}.${ext}`;
}

export const withTaskName = (name, fn) =>
  Object.assign(fn, { displayName: name });

export const run = async (command, cwd = projRoot) =>
  new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(" ");
    console.info(`run: ${chalk.green(`${cmd} ${args.join(" ")}`)}`);
    const app = spawn(cmd, args, {
      cwd,
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    const onProcessExit = () => app.kill("SIGHUP");

    app.on("close", (code) => {
      process.removeListener("exit", onProcessExit);

      if (code === 0) resolve();
      else
        reject(
          new Error(`Command failed. \n Command: ${command} \n Code: ${code}`)
        );
    });
    process.on("exit", onProcessExit);
  });
