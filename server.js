const express = require('express');
const app = express();

app.use(express.json());

app.get('/store/:city', (req, res) => {
    res.send({ name: req.params.city });
});

app.put('/store/:city', (req, res) => {
    req.body.updated = true;
    res.send({ name: req.params.city });
});

module.exports = app;