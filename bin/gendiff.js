#!/usr/bin/env node

import genDiff from '../src/index.js';
import { Command } from 'commander';
const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2))
  });

program.parse();


