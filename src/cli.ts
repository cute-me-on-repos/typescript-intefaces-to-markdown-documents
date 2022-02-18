#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv)) 
  // Use the cmds directory to scaffold.
  .commandDir('cmds')
  // Enable strict mode.
  .strict()
  // Useful aliases.
  .alias({ h: 'help' })
  .check((argv, options) => {
    const filePaths = argv._; 
    process.stdout.write(filePaths.join('\n=>'));
    if (filePaths.length > 1) {
      throw new Error("Only 0 or 1 files may be passed.")
    } else {
      return true // tell Yargs that the arguments passed the check
    }
  })
  .argv;