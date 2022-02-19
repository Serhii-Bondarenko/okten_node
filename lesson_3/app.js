// ДЗ
//
// Попереднє дз переписати на роути і контролери і написати мідлвару яка буде перевіряти по роуту
// /sigIn чи імейл існує в масиві юзерів і другу мідлвару /login чи користувач ввів всі data

const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');
const apiRouter = require('./routes/api.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

app.use(apiRouter);

app.listen(5200, () => {
    console.log('Server has been started on PORT 5200');
})