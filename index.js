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
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            parseFile(files);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

function parseFile(file) {
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
