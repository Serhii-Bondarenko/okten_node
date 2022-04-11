import { ISocketData } from '../interfaces';

export const socketController = {
    messageToAll: (io: any, socket: any, data: ISocketData) => {
        io.emit('message:get-all', { messages: data.message });
    },
    messageToRoom: (io: any, socket: any, data: ISocketData) => {
        io.to(data.id).emit('message:get-visitors', { message: `${data.userId}: ${data.message})` });
    },
    joinRoom: (io: any, socket: any, data: ISocketData) => {
        socket.join(data.id);
        io.to(data.id).emit('user_join_room', { message: `User ${socket.id} joined room ${data.id}` });
    },
};
