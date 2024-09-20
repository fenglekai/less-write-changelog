import { createParserOpts } from "./parser.js";
import { createWriterOpts } from "./writer.js";
import { whatBump } from "./whatBump.js";
import conventionalChangelogCore from "conventional-changelog-core";

export async function createPreset() {
  return {
    parser: createParserOpts(),
    writer: await createWriterOpts(),
    whatBump,
  };
}

const main = () => {
  console.log("🚀 start generate changelog");
  conventionalChangelogCore({ config: createPreset(), releaseCount: 0 }).pipe(
    process.stdout
  );
};

main()

export default main
