const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    switch (command.split(" ")[0]) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            parseFile();
            break;
        case 'important':
            importantFile();
            break;
        case `user`:
            userNameFile(command.split(" ")[1].toLowerCase());
            break;
        case 'sort':
            sortFile(command.split(" ")[1]);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

function importantFile() {
    for (let file of files) {
        for (let str of file.split('\n')) {
            if (str.includes('// TODO') && str.includes('!') ){
                const processedStr = str.split('// TODO ')[1];
                if (processedStr !== undefined)
                    console.log(processedStr);
            }
        }
    }
}

function parseFile () {
    for (let file of files) {
        for (let str of file.split('\n')) {
            if (str.includes('// TODO')){
                const processedStr = str.split('// TODO ')[1];
                if (processedStr !== undefined)
                    console.log(processedStr);
            }
        }
    }
}

function userNameFile (userName) {
    for (let file of files) {
        for (let str of file.split('\n')) {
            if (str.includes('// TODO') && str.toLowerCase().includes(userName)){
                const processedStr = str.split('// TODO ')[1].split(';')[2];
                if (processedStr !== undefined)
                    console.log(processedStr);
            }
        }
    }
}

function sortImportance(){
    const importantTodos = [];
    const normalTodos = [];

    for (let file of files) {
        for (let str of file.split('\n')) {
            if (str.includes('// TODO')){
                const processedStr = str.split('// TODO ')[1];
                if (processedStr !== undefined) {
                    const exclamationCount = (processedStr.match(/!/g) || []).length;

                    if (exclamationCount > 0) {
                        importantTodos.push({text: processedStr, count: exclamationCount});
                    } else {
                        normalTodos.push(processedStr);
                    }
                }
            }
        }
    }

    importantTodos.sort((a, b) => b.count - a.count);
    for (let todo of importantTodos) {
        console.log(todo.text);
    }
    for (let todo of normalTodos) {
        console.log(todo);
    }
}

function sortUser(){
    const userTodos = {};
    const anonymousTodos = [];

    for (let file of files) {
        for (let str of file.split('\n')) {
            if (str.includes('// TODO')){
                const processedStr = str.split('// TODO ')[1];
                if (processedStr !== undefined) {
                    const parts = processedStr.split(';');
                    const userName = parts[0].trim();
                    if (userName && parts.length >= 1) {
                        if (!userTodos[userName]) {
                            userTodos[userName] = [];
                        }
                        userTodos[userName].push(processedStr);
                    } else {
                        anonymousTodos.push(processedStr);
                    }
                }
            }
        }
    }

    const sortedUsers = Object.keys(userTodos).sort();

    for (let user of sortedUsers) {
        console.log(user + ':');
        for (let todo of userTodos[user]) {
            console.log('  ' + todo);
        }
    }

    if (anonymousTodos.length > 0) {
        for (let todo of anonymousTodos) {
            console.log('  ' + todo);
        }
    }
}
function sortDate(){
    const withDate = [];
    const withoutDate = [];

    for (let file of files) {
        for (let str of file.split('\n')) {
            if (str.includes('// TODO')){
                const processedStr = str.split('// TODO ')[1];
                if (processedStr !== undefined) {
                    const parts = processedStr.split(';');

                    if (parts.length >= 2) {
                        const dateStr = parts[1].trim();
                        const date = new Date(dateStr);

                        if (!isNaN(date.getTime())) {
                            withDate.push({text: processedStr, date: date});
                        } else {
                            withoutDate.push(processedStr);
                        }
                    } else {
                        withoutDate.push(processedStr);
                    }
                }
            }
        }
    }
    withDate.sort((a, b) => b.date - a.date);
    for (let todo of withDate) {
        console.log(todo.text);
    }
    for (let todo of withoutDate) {
        console.log(todo);
    }
}
function sortFile(sortBy) {
    switch (sortBy){
        case 'importance':
            sortImportance();
            break;
        case 'user':
            sortUser();
            break;
        case 'date':
            sortDate();
            break;
        default:
            console.log('Unknown sort type. Use: importance, user, or date');
            break;
    }
}