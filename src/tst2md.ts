#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv)) 
  // Use the cmds directory to scaffold.
  .usage('Usage: $0 <command> [options]')
  .commandDir('cmds')
  // Enable strict mode.
  .strict()
  // Useful aliases.
  .alias({ h: 'help' })
  .argv;