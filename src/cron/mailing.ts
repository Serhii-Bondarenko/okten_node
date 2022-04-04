import cron from 'node-cron';

import { emailService } from '../services';
import { userRepository } from '../repositories';
import { EmailActionEnum } from '../constants';

export const mailingList = async () => {
    cron.schedule('*/30 * * * * *', async () => {
        console.log('START WORK WITH mailingList');
        const users = await userRepository.getUsers();
        console.log(users);
        const usersWithMail = users.map(async (user) => {
            const sendActions = await emailService
                .sendMail(user.email, EmailActionEnum.MAILING_LIST, {
                    userName: user.firstName,
                });

            return sendActions;
        });

        await Promise.all(usersWithMail);
    });
};
