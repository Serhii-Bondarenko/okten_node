const users = require("../db/users");

module.exports = {

    emptyData: ({body}, response, next) => {
        try {
            const emptyField = Object.keys(body).find(key => !body[key].trim());

            if (emptyField) throw new Error('Fields can not be empty!');

            next();

        } catch (err) {
            response.status(400).send(err.message);
        }
    },

    copy: ({body}, response, next) => {

        try {
            const userCopy = users.find(user => user.email === body.email);

            if (userCopy) throw new Error('This user has been already exist');

            next();

        } catch (err) {
            response.status(400).send(err.message);
        }
    },

    notFound: (request, response, next) => {

        try {
            const user = users.find(user => user.id === +request.params.userId);

            if (!user) throw new Error(`User ${request.params.userId} not a found`);

            request.user = user;
            next();

        } catch (err) {

            response.status(400).send(err.message);
        }

    },

    auth: (request, response, next) => {
        try {
            const user = users.find(user => Object.keys(request.body).every(key => user[key] === request.body[key]));

            if (!user) throw new Error('Wrong email or password');

            request.user = user;
            next();
        } catch (err) {

            response.status(400).send(err.message);
        }

    }
}