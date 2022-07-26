const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');

const app = express();

app.use(bodyParser.json());

app.get('/api/values', function(req, res) {
    db.pool.query(`SELECT * FROM lists;`, (err, results, fields) => {
        if(err) return res.status(500).send(err);
        return res.json(results);
    });
});

app.post('api/value', function(req, res) {
    db.pool.query(`INSERT INTO lists(value) VALUES(${req.body.value})`, function(err, results, fields) {
        if(err) return res.status(500).send(err);
        return res.json({ success: true, value: req.body.value });
    });
});



app.listen(5000, () => {
    console.log('애플리케이션이 5000번 포트에서 시작되었습니다.');
})