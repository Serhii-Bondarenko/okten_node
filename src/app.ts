import express from 'express';
import { users } from './users';

const app = express();

console.log(users);

app.listen(5500, () => {
    console.log('Server has been started!');
});
