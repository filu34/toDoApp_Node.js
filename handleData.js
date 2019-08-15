const colors = require('colors');
const fs = require('fs');

const handleData = (type, title) => {
    
    //type - number ( 1 - add, 2 - remove, 3 - list )
    //title ( string || null )

    const data = fs.readFileSync('datadb.json');
    // let data = fs.readFileSync('datadb.json');
    // data = data.toString();
    let tasks = JSON.parse(data);
    // console.log(tasks);

    if(type === 1 || type === 2) {
        isExisted = tasks.find(task => task.title === title) ? true : false;
        if(type === 1 && isExisted) {
            return console.log('That task already exists.'.red);
        } else if (type === 2 && !isExisted) {
            return console.log("I can't remove task, that already exists.".red)
        }
    }

    let dataJSON = "";

    switch (type) {
        case 1:

            //reconstruction of array
            // console.log(tasks);
            tasks = tasks.map((task, index) => ({id: index + 1, title: task.title}));
            // console.log(tasks);
            const id = tasks.length + 1;

            tasks.push({ id, title });
            // console.log(tasks);
            dataJSON = JSON.stringify(tasks);
            // console.log(dataJSON);
            fs.writeFileSync('datadb.json', dataJSON);
            console.log(`I'm adding task: ${title}`.white.bgGreen);

            break;
        
        case 2:
            // console.log("Usuwam zadanie.");
            // console.log(tasks);
            const index = tasks.findIndex(task => task.title === title);
            tasks.splice(index, 1);
            // console.log(tasks);
            tasks = tasks.map((task, index) => ({id: index + 1, title: task.title}));
            // console.log(tasks);
            dataJSON = JSON.stringify(tasks);
            fs.writeFile('datadb.json', dataJSON, 'utf8', (err) => {
                if(err) throw err;
                console.log(`Task ${title} has been removed.`.white.bgGreen);
            })

            break;
        
        case 3:
            console.log(`List of tasks includes ${tasks.length} positions. To do, you have: `);
            if (tasks.length) {
                tasks.forEach((task, index) => {
                    if (index % 2) return console.log(task.title.green);
                    return console.log(task.title.yellow);
                });
            }
            break;
    }

};

module.exports = handleData;