// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const apiVersion = process.env.npm_package_version;
const buildTime = new Date().toString();
const apiInformation = `API Version: ${apiVersion} <br />
Build time: ${buildTime}`;
const filePath = path.join(__dirname, '../api-info.txt');
fs.writeFileSync(filePath, apiInformation, 'utf-8');
// eslint-disable-next-line no-console
console.log('Saved API information: ', apiInformation);
