const express = require('express');

// factory function to keep express dependency in one place
const getRouterHof = e => () => e.Router();
const getRouter = getRouterHof(express);

module.exports = getRouter;
