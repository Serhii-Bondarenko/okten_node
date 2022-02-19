const users = require("../db/users");

module.exports = {
    renderLoginForm: (request, response) => {
        response.render('login');
    },

    createUser: (request, response) => {
        users.push({...request.body, id: users.length ? users[users.length - 1].id + 1 : 1});

        response.redirect('/users');
    }
}