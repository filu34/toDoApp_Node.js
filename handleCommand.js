const handleData = require('./handleData');

const handleCommand = ({add, remove, list}) => {
    // console.log(add, remove, list);
    if(add) {
        if(typeof add !== "string") {
            return console.log('Write in a name of task that you want to add (in text format).'.red);
        } else if (add.length < 7) {
            return console.log('Name of a task need to contain more than 6 characters.'.red);
        }
        handleData(1, add);
        // console.log('Będę coś dodawać.');
    } else if(remove) {
        if(typeof remove !== 'string' || remove.length < 7) {
            return console.log("Write in name of task that you want to remove (it need to be a text format, also include more than 6 characters).".red);
        }
        handleData(2, remove);
        // console.log('Będę coś usuwać.');
    } else if(list || list === "") {
        handleData(3, null);
        // console.log('Pokazuję listę.');
    } else {
        console.log(`I don't understand command. Use --add="task name", --remove="task name" or option --list .`.red);
    }
}

module.exports = handleCommand;