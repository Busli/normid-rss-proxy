const express = require('express');

const app = express();

// Add CORS headers
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('*', (req, res) => {
  res.set('Content-Type', 'application/rss+xml; charset=UTF-8');
  res.sendFile(`${__dirname}/static/normid.xml`);
});

app.listen(3000);