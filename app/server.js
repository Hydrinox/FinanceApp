const express = require('express');
const path = require('path');
var http = require('http');
var enforce = require('express-sslify');

const app = express();

//forces route to https
app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use(express.static('./dist/my-finance-app'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/my-finance-app/' }),
);


http.createServer(app).listen(process.env.PORT || 8000);
