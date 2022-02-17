// ДЗ
//
// декілька ендпоінтів зробити
//
// 1. /login, поля які треба відрендерити в файлі hbs: firstName, lastName, email(унікальне поле), password, age, city
// просто зробити темплейт з цим усім і вводити свої дані які будуть пушитися в масив і редірект робити на сторінку
// з усіма юзерами /users і перевірка чи такий імейл не існує, якщо існує то редірект на еррор пейдж
// 2. /users просто сторінка з усіма юзерами, але можна по квері параметрам їх фільтрувати по age і city
// 3. /user/:id сторінка з інфою про одного юзера
//
// 4. зробити якщо не відпрацюють ендпоінти то на сторінку notFound редірект

// Необхідно розширити ваше ДЗ:
//     - додайте ендпоінт signIn який буде приймати email і password і якщо все вірно то редірект на сторінку цього
//
// * хто хоче складніше реалізуйте видалення користувача.
// Кнопка повинна знаходитись на сторінці з інфою про одного юзера. Після видалення редірект на "/users"

const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

let users = [];
let error = '';

app.get('/', (request, response) => {
    response.render('login');
});

app.post('/', (request, response) => {

    const userCopy = users.find(user => user.email === request.body.email);

    if (userCopy) {
        error = 'This user has been already exist';
        response.redirect('/error');

        return;
    }

    users.push({...request.body, id: users.length ? users[users.length - 1].id + 1 : 1});

    response.redirect('/users');
});

app.get('/signIn', (request, response) => {
    response.render('signIn');
});

app.post('/signIn', ({body}, response) => {
    const user = users.find(user => Object.keys(body).every(key => user[key] === body[key]));

    if (!user) {
        error = 'Wrong email or password';
        response.redirect('/error');

        return;
    }

    response.redirect(`/users/${user.id}`);
});

app.get('/users', ({query}, response) => {

    if (Object.keys(query).length) {
        let filteredUsers = [...users];

        filteredUsers = users.filter(value => Object.keys(query).every(key => value[key] === query[key]));
        response.render('users', {users: filteredUsers});

        return;
    }

    response.render('users', {users});
});

app.get('/users/:userId', ({params}, response) => {
    const user = users.find(user => user.id === +params.userId);

    if (!user) {
        error = `User ${params.userId} not a found`;
        response.redirect('/error');

        return;
    }

    response.render('userDetails', {user});

});

app.post('/users/:id', ({params}, response) => {
    const removedUser = users.findIndex(user => user.id === +params.id);
    users.splice(removedUser, 1);

    response.redirect('/users');
});

app.get('/error', (request, response) => {
    response.render('error', {error});
});

app.use((request, response) => {
    response.render('notFound');
});

app.listen(5200, () => {
    console.log('Server has been started on PORT 5200');
})