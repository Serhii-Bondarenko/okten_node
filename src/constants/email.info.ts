import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome to IFilm',
        html: 'Welcome to our website',
    },

    [emailActionEnum.USER_ENTER]: {
        subject: 'Salute!',
        html: 'You have successfully logged in',
    },
};
