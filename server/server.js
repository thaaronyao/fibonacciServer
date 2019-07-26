const express = require('express');
const cookieParser = require('cookie-parser');
const cookieController = require('../cookieController/cookieController');

const app = express();
app.use(cookieParser());

app.get('/previous', cookieController.checkCookie, (req,res) => {
    res.send(`previous value is: ${res.locals.previous}`)
});

app.get('/current',cookieController.checkCookie, (req,res) => {
    res.send(`current value is: ${res.locals.current}`)
});

app.get('/next',cookieController.checkCookie, (req,res) => {
    res.send(`next value is: ${res.locals.next}`)
});

app.listen(3000);