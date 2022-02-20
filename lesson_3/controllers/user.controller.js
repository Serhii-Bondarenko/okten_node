const users = require('../db/users');

module.exports = {
    getAllUsers: ({query}, response) => {
        if (Object.keys(query).length) {
            let filteredUsers = [...users];

            filteredUsers = users.filter(value => Object.keys(query).every(key => value[key] === query[key]));

            response.render('users', {users: filteredUsers});
            return;
        }

        response.render('users', {users});
    },

    getUserById: ({user}, response) => {
        response.render('userDetails', {user});
    },

    removeUserById: ({params}, response) => {
        const removedUser = users.findIndex(user => user.id === +params.id);
        users.splice(removedUser, 1);

        response.redirect('/users');
    }
}
