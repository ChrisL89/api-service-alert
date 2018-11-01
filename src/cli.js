#!/usr/bin/env node
'use strict';

const apiServiceAlert = require('./');
const meow = require('meow');

const cli = meow(`
Usage
  $ api-service-alert [input]

Options
  --example   Example Input. [Default: false]

Examples
  $ api-service-alert --example=true bar
`);

apiServiceAlert(cli.input[0], cli.flags);
