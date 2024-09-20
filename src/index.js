import conventionalChangelogCore from "conventional-changelog-core";
import createPreset from "./preset.js";
import { createWriteStream } from "fs";

console.log("🚀 start generate changelog");

let changelogFile = "CHANGELOG.md";
let releaseFile = "RELEASE.md";

conventionalChangelogCore({
  config: createPreset(),
  releaseCount: 0,
})
  .on("error", (err) => {
    if (flags.verbose) {
      console.error(err.stack);
    } else {
      console.error(err.toString());
    }
    process.exit(1);
  })
  .pipe(createWriteStream(changelogFile));

conventionalChangelogCore({
  config: createPreset(false),
  releaseCount: 2,
})
  .on("error", (err) => {
    if (flags.verbose) {
      console.error(err.stack);
    } else {
      console.error(err.toString());
    }
    process.exit(1);
  })
  .pipe(createWriteStream(releaseFile));
