module.exports = {
    renderSignInForm: (request, response) => {
        response.render('signIn');
    },

    signIn: ({user}, response) => {
        response.redirect(`/users/${user.id}`);
    }
}