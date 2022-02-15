const fs = require('fs');
const path = require('path');

const onlineUsers = [{name: "Andrii", age: 22, city: "Lviv"}, {name: "Nikita", age: 24, city: "Kherson"}];
const inPersonUsers = [{name: "Vasyl", age: 15, city: "Rivne"}, {name: "Vova", age: 19, city: "Dnipro"}];

const createDirectory = (name, fileName, dataArr, format) => {
    fs.mkdir(path.join(__dirname, 'main', name), {recursive: true}, err => {
        if (err) throw err; // не удалось создать папки

        for (let user of dataArr) {
            for (let key in user) {
                fs.writeFile(path.join(__dirname, 'main', name, `${fileName}.${format}`),
                    `${key.toUpperCase()}:${user[key]}\n`,
                    {flag: 'a'},
                    err => {
                        if (err) throw err;
                    });

            }
        }

        console.log(`Папка ${name} успешно создана`);
    });
}

createDirectory('online', 'onlinePerson', onlineUsers, 'txt');
createDirectory('inPerson', 'inPerson', inPersonUsers, 'txt');