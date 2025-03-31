const express = require('express');
const app = express();
const fs = require('fs');
const { exec } = require('child_process');

app.use(express.json());

app.get('/exec', (req, res) => {
    const cmd = req.query.cmd;
    exec(cmd, (err, stdout, stderr) => {
        if (err) return res.send(stderr);
        res.send(stdout);
    });
});

app.get('/xss', (req, res) => {
    const name = req.query.name || 'user';
    res.send(`<h1>Welcome, ${name}</h1>`);
});

app.get('/read', (req, res) => {
    const file = req.query.file;
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) return res.send('Error reading file');
        res.send(data);
    });
});

app.post('/eval', (req, res) => {
    const input = req.body.code;
    const result = eval(input); // 👈 nunca faça isso!
    res.send(`Result: ${result}`);
});

app.listen(3000, () => {
    console.log('Vulnerable app listening on port 3000');
});
