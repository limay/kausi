const express = require('express');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');
const analytics = require('universal-analytics');

const app = express();

// Setup gzip
app.use(compression());

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] :response-time ms ":method :url HTTP/:http-version" :status :res[content-length]'));

// Setup analytics
app.use(analytics.middleware('UA-3628636-11', {https: true}));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  req.visitor.pageview("/", "https://kausi.xyz", "Kausi").send();
});

module.exports = app;
