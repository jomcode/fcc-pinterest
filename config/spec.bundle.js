require('core-js');
global.sinon = require('sinon');

const context = require.context('../src/client', true, /\.spec\.js$/);

function requireAll(ctx) {
  return ctx.keys().map(ctx);
}

requireAll(context);
