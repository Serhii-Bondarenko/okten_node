import path from 'path';
import nodemailer, { SentMessageInfo } from 'nodemailer';
import EmailTemplates from 'email-templates';

import { config } from '../config/config';
import { EmailActionEnum, emailInfo, headers } from '../constants';

class EmailService {
    async sendMail(userMail: string, action: EmailActionEnum, context: {}):
        Promise<SentMessageInfo> {
        const { subject, templateName } = await emailInfo[action];

        const templateParser = await new EmailTemplates({
            views: {
                // @ts-ignore
                root: path.join(global.rootDir, 'email-templates'),
            },
        });

        Object.assign(context, { frontendUrl: headers.FRONTEND_URL });

        const html = await templateParser.render(templateName, context);

        const emailTransporter = nodemailer.createTransport({
            from: 'IFilm',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            },
        });

        return emailTransporter.sendMail({
            to: userMail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
