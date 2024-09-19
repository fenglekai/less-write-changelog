import conventionalChangelog from 'conventional-changelog';
import config from './src/index';

conventionalChangelog(config())
  .pipe(process.stdout);