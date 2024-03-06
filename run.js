#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length !== 3) {
    console.error('Usage: run.js <filename>');
    process.exit(1);
}

const file = process.argv[2];

if (!fs.existsSync(file)) {
    console.error(`File '${file}' not found.`);
    process.exit(1);
}

try {
    execSync(`node built/local/tsc.js ${file}`, { stdio: 'inherit' });
} catch (error) {
    console.error(`Error compiling TypeScript file: ${error.message}`);
    process.exit(1);
}

const filename = path.basename(file, path.extname(file));
const jsFile = path.join(path.dirname(file), `${filename}.js`);

try {
    execSync(`node ${jsFile}`, { stdio: 'inherit' });
} catch (error) {
    console.error(`Error running JavaScript file: ${error.message}`);
    process.exit(1);
}
