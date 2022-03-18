// 1)Повторіть всі ендпоінти як в мене
// 2)Створіть міграцію для таблиці comments, яка буде мати такі поля
// (id, text, authorId, postId, like, dislike, createdAt,deletedAt),
// відповідно звязок з таблицею юзерс і постс
// 3)Створіть ендпоінт get /posts/userId - який буде виводити пости якогось юзера який їх створив
// 4)update /posts/userId можна оновити текст про пост
// 5)get comments/userId вивести коментарі
// які належать юзеру який їх написав і пости в яких вони написані
// (якщо через квері почитаєте як там зробити мulti select)
// *6) update /comments/action написати ендпоінт який буде приймати в body
// commentId, action(like, dislike) і оновлювати в бд інформацію
// про кількість лайків і дизлайків в коментарі
// (буде трохи криво бо один юзер зможе лайкати багато раз один пост)

import express from 'express';
import { createConnection } from 'typeorm';

import { apiRouter } from './routes';
import { config } from './config/config';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

const { PORT } = config;

app.listen(PORT, async () => {
    console.log(`Server has been started on PORT:${PORT}`);

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
