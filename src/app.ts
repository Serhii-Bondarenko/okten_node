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

import http from 'http';
import express from 'express';
import SocketIO from 'socket.io';
import { createConnection } from 'typeorm';

import { apiRouter } from './routes';
import { config } from './config/config';
// import { cronRun } from './cron';
import { socketController } from './controller';
import { ISocketData } from './interfaces';

// @ts-ignore
global.rootDir = __dirname;

const app = express();
const server = http.createServer(app);

// @ts-ignore
const io = SocketIO(server, { cors: { origin: '*' } });

io.on('connection', (socket: any) => {
    console.log('________________-');
    console.log(socket.handshake.query.userId);
    console.log(socket.handshake.query.accessToken);
    console.log('________________-');

    // ONE TO ONE
    // socket.emit(event, {});

    // SEND TO ALL ONLINE USERS (INCLUDE SENDER)
    // io.emit(event, {})

    // SEND TO ALL ONLINE USERS (AVOID SENDER)
    // socket.broadcast.emit(event, {})

    // socket.join(room_id)

    // TO ROOM AVOID SENDER
    // socket.broadcast.to(room_id).emit(event, {})

    // TO ROOM INCLUDE SENDER
    // io.to(room_id).emit(event, {})

    socket.on('messageToAll', (data: ISocketData) => socketController.messageToAll(io, socket, data));
    socket.on('messageToRoom', (data: ISocketData) => socketController.messageToRoom(io, socket, data));
    socket.on('joinRoom', (data: ISocketData) => socketController.joinRoom(io, socket, data));
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

const { PORT } = config;

server.listen(PORT, async () => {
    console.log(`Server has been started on PORT:${PORT}`);

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
            // cronRun();
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
