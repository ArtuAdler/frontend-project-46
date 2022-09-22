#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();

// program
//     .version('0.0.1', '-V, --version ', 'output the version number')
//     .helpOption('-h, --help', 'display help for command')

program  
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0');
program.parse();
// console.log(22)
