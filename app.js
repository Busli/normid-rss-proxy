const express = require('express');

const app = express();

app.get('*', (req, res) => {
  res.append('Content-Type', 'application/rss+xml; charset=UTF-8');
  res.append('Access-Control-Allow-Origin', '*');
  res.sendFile(`${__dirname}/static/normid.xml`);
});

app.listen(3000);