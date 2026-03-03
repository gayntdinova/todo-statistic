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
    const Arr= []
    for (let file of files) {
        for (let str of file.split('\n')) {
            if (str.includes('// TODO')){
                const processedStr = str.split('// TODO ')[1];
                if (str.includes('!')){
                    if (processedStr !== undefined)
                        console.log(processedStr);
                }
                else {
                    if (processedStr !== undefined)
                        Arr.push(processedStr);
                }
            
            }
        }
    }
    for (let element of Arr){
        console.log(element);
    }
}

function sortFile (sortBy) {
    switch (sortBy){
        case 'importance':
           sortImportance();
           break; 
        case 'date':
            
    }
    
}