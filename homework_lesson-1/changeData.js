const fs = require('fs');
const path =require('path');

const onlinePerson = path.join(__dirname, 'main', 'online', 'onlinePerson.txt');
const inPerson = path.join(__dirname, 'main', 'inPerson', 'inPerson.txt');

const changeData = () => {
    fs.readFile(onlinePerson, 'utf8', (err, data1) => {
        if(err) {
            console.log(err, `${onlinePerson} данных не найдено`);
            throw err;
        }

        fs.readFile(inPerson, 'utf8', (err, data2) => {
            if (err) {
                console.log(err, `${inPerson} данных не найдено`);
                throw err;
            }

            fs.appendFile(onlinePerson, data2, {flag: 'w'}, err => {
                if(err){
                    console.log(err, `ошибка в изменении ${onlinePerson}`);
                    throw err;
                }

                fs.appendFile(inPerson, data1, {flag: 'w'}, err => {
                    if(err){
                        console.log(err, `ошибка в изменении ${inPerson}`);
                        throw err;
                    }

                    console.log('Данные изменены');
                })
            })
        })
    })
}

changeData();
