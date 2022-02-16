// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу,
//     дані які ви отримали запишіть їх в інший файл, в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так
const fs = require('fs');
const path = require('path');

const someDataFile = path.join(__dirname, 'someData.txt');
const someDataClone = path.join(__dirname, 'someDataClone.txt');

const createFile = () => {
    fs.writeFile(someDataFile, 'lorem ipsum', err => {
        if (err) throw err;

        fs.readFile(someDataFile, 'utf8', (err, data) => {
            if (err) throw err;

            fs.writeFile(someDataClone, data, err => {
                if (err) {
                    console.log('помилка створення');
                    throw err;
                }

                console.log('Операція успішна');
            })
        })
    })
}

// createFile();

// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній,
//     старий файл видаліть після того як все завершиться. Також вийде callback hell

const copyDataToDir = () => {
    fs.readFile(path.join(__dirname, 'task2.txt'), 'utf8', ((err, data) => {
        if (err) throw err;

        fs.mkdir(path.join(__dirname, 'Task2'), err => {
            if (err) throw err;

            fs.writeFile(path.join(__dirname, 'Task2', 'task2Clone.txt'), data, err => {
                if (err) throw err;

                fs.unlink(path.join(__dirname, 'task2.txt'), err => {
                    if (err) {
                        console.log('Помилка копіювання');
                        throw err;
                    }

                    console.log('Копіювання данних в task2Clone.txt завершено');
                })
            })
        })
    }))
}

// copyDataToDir();

// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані
// (можуть бути нові папки і файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать - це файли
// тоді вам потрібно їх очистити, але не видаляти, якщо дані - це папки,
//     вам потрібно їх перейменувати і додати до назви префікс _new

const createDirAndFiles = () => {
    for (let i = 1; i <= 3; i++) {
        fs.mkdir(path.join(__dirname, 'Task3', `directory_${i}`), err => {
            if (err) throw err;
        });

        fs.writeFile(path.join(__dirname, 'Task3', `file_${i}.txt`), `some data ${i}`, err => {
            if (err) throw err;
        })
    }
}

// createDirAndFiles();

const checkStatus = () => {
    fs.readdir(path.join(__dirname, 'Task3'), (err, data) => {
        if (err) {
            console.log('Помилка зчитування папки');
            throw err;
        }

        data.forEach(endPoint => {

            fs.lstat(path.join(__dirname, 'Task3', endPoint), ((err, stats) => {

                if (err) {
                    console.log(err);
                    throw err;
                }

                if (stats.isDirectory()) {
                    fs.rename(path.join(__dirname, 'Task3', endPoint), path.join(__dirname, 'Task3', `_new${endPoint}`), err => {
                        if (err) {
                            console.log(err)
                            throw err;
                        }
                    });

                    return;
                }

                fs.truncate(path.join(__dirname, 'Task3', endPoint), err => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                });

            }))
        })

        console.log('Файли та директорії було змінено');
    })
}

// checkStatus();