const path = require('path');

const rootDir = path.join(__dirname, '..');
const modulesDir = path.join(rootDir, 'node_modules');
const sourceDir = path.join(rootDir, 'src', 'client');
const mainPath = path.join(rootDir, 'src', 'client', 'main.js');
const outputDir = path.join(rootDir, 'dist');
const host = process.env.WEBPACK_HOST || 'localhost';
const port = process.env.WEBPACK_PORT || 8080;
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';
const isHot = process.env.HMR === 'enabled';

module.exports.rootDir = rootDir;
module.exports.modulesDir = modulesDir;
module.exports.sourceDir = sourceDir;
module.exports.mainPath = mainPath;
module.exports.outputDir = outputDir;
module.exports.host = host;
module.exports.port = port;
module.exports.isProduction = isProduction;
module.exports.isDevelopment = isDevelopment;
module.exports.isTest = isTest;
module.exports.isHot = isHot;
