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
};
