import conventionalChangelogCore from "conventional-changelog-core";
import createPreset from "./preset.js";
import { createWriteStream } from "fs";
import { gitRawCommitsOpts } from "./gitRawCommits.js";

console.log("🚀 start generate changelog");

let changelogFile = "CHANGELOG.md";
let releaseFile = "RELEASE.md";

conventionalChangelogCore(
  {
    config: createPreset(),
    releaseCount: 0,
    outputUnreleased: false,
  },
  null,
  gitRawCommitsOpts
)
  .on("error", (err) => {
    if (flags.verbose) {
      console.error(err.stack);
    } else {
      console.error(err.toString());
    }
    process.exit(1);
  })
  .pipe(createWriteStream(changelogFile));
console.log("✔️ gen changelog complete");

conventionalChangelogCore(
  {
    config: createPreset(false),
    releaseCount: 2,
  },
  null,
  gitRawCommitsOpts
)
  .on("error", (err) => {
    if (flags.verbose) {
      console.error(err.stack);
    } else {
      console.error(err.toString());
    }
    process.exit(1);
  })
  .pipe(createWriteStream(releaseFile));
console.log("✔️ gen release complete");
