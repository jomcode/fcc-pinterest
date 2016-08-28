const express = require('express');

const app = express();

app.use(express.static('dist'));

app.get('/foo', (req, res) => {
  res.status(200).json({ foo: 'bar' });
});

module.exports = app;
