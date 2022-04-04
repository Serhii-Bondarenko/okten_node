import { mailingList } from './mailing';

export const cronRun = async () => {
    console.log('CRON WAS STARTED');
    await mailingList();
};
