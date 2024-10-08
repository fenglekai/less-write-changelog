import { createParserOpts } from "./parser.js";
import { createWriterOpts } from "./writer.js";
import { whatBump } from "./whatBump.js";
import { gitRawCommitsOpts } from "./gitRawCommits.js";

export default async function createPreset(useHeader = true) {
  return {
    parser: createParserOpts(),
    writer: await createWriterOpts(useHeader),
    commits: gitRawCommitsOpts,
    whatBump,
  };
}
