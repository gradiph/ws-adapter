#!/usr/bin/env node
'use strict';

import { writeFileSync } from 'fs';

const stamp = new Date().toISOString();
writeFileSync('./src/build/build-time.ts', `export default '${stamp}';\n`);
