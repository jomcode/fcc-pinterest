const express = require('express');

const getRouterHof = e => () => e.Router();
const getRouter = getRouterHof(express);

module.exports = getRouter;
