import { EmailActionEnum } from './enums';

export const emailInfo = {
    [EmailActionEnum.WELCOME]: {
        subject: 'Welcome to IFilm',
        templateName: 'welcome',
    },

    [EmailActionEnum.USER_ENTER]: {
        subject: 'Salute!',
        templateName: 'signIn',
    },

    [EmailActionEnum.FORGOT_PASSWORD]: {
        subject: 'Update your password',
        templateName: 'forgotPassword',
    },

    [EmailActionEnum.MAILING_LIST]: {
        subject: 'This is every day email for you!',
        templateName: 'cronMailing',
    },
};
