#!/usr/bin/env node

import { program } from 'commander';
import init from '../src/commands/init.js';
import dev from '../src/commands/dev.js';

program
  .command('init')
  .alias('i')
  .description('Initialize new project with .meshrc.yaml configuration file')
  .action(init)

program
  .command('dev')
  .alias('d')
  .description('Starts a development graphql mesh server')
  .action(dev)

program.parse(process.argv);
