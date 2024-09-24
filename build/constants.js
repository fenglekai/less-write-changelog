import pkg from "../package.json" with { type: "json" };
import {resolve} from 'path'

export const projRoot = resolve('..');
export const buildRoot = resolve(projRoot, "build");
export const leOutput = resolve(projRoot,"dist");
export const lePackage = resolve(projRoot, "package.json");

export const target = "esnext";
export const banner = `#!/usr/bin/env node\n/*! Less Write Changelog v${pkg.version} */\n`;