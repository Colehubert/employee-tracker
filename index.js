require('dotenv').config()
var mysql = require('mysql2');
var inquirer = require('inquirer');
var select = require('@inquirer/select')
var {addExitCallback} = require('catch-exit');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'mydatabase'
});

// inquirer.prompt([{name:'main',message:'what would you like to do ?'}]).then(function(answers){
//     console.log(answers.main);
// })
addExitCallback(function(){
    console.log("error");
});
// multiple callbacks can be registered
addExitCallback((signal) => {
    // see Async error section of README below for why you might need to do this
    if (signal !== 'exit') {
        console.log("error1")
    }
});
 function getSelection() {
    var answer = new Promise(function (r) {

    var choice =     select({
            message: 'what would you like to do ?',
            pageSize: 8,
            choices: [
                {
                    name: 'view all employees',
                    value: 'view employee',

                },
                {
                    name: 'add employee',
                    value: 'add employee',

                },
                {
                    name: 'update employee role ',
                    value: 'update role',

                },
                {
                    name: 'view all roles ',
                    value: 'view role',

                },
                {
                    name: 'Add Role ',
                    value: 'add role',

                },
                {
                    name: 'view all departments ',
                    value: 'view department',

                },
                {
                    name: 'add department ',
                    value: 'add department',

                },
                {
                    name: 'quit ',
                    value: 'quit',

                },

            ],
        });
        r(choice)
    })
    return  answer;
}
function viewTable(tableName) {


    connection.promise().query("SELECT * from " + tableName)
        .then(([rows, fields]) => {
            obj = rows.reduce((acc, { id, ...x }) => { acc[id] = x; return acc }, {});

            console.table(obj);
        })
        .catch(console.log)
        .then(() => main());

}



async function addToTable(tableName) {
    if (tableName == "department") {
        try {
            var answers = await inquirer.prompt([{ name: 'name', message: 'what is the name of the department ?' }]).then((result)=>console.log(result));

          } catch(err) {
            console.log(err);
          }
        
        //await inquirer.prompt([{ name: 'name', message: 'what is the name of the department ?' }]).then(function (answers) {
      
        console.log(answers.name);
        connection.promise().query("insert into " + tableName + " (name) values ('" + answers.name + "');")
            .then(([rows, fields]) => {
                console.log("added " + answers.name + " to the database");
            })
            .catch(console.log)
            .then(() => main());


    }
}

async function main() {
    var answer = await getSelection();
    if (answer == "quit") {

       process.exit(0);
    }
    else if (answer.includes("view")) {
        viewTable(answer.split(" ")[1]);
    }
    else if (answer.includes('add')) {
        addToTable(answer.split(" ")[1]);

    }
    else if (answer.includes('update')) {
        updateRole();
    }

}
main();


