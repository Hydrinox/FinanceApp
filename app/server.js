const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/my-finance-app'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/my-finance-app/' }),
);

console.log('this is port', process.env.PORT);
app.listen(process.env.PORT || 8000);