require('dotenv').config()
var mysql = require('mysql2');
var inquirer = require('inquirer');
import select from '@inquirer/select';


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
     password: process.env.PASSWORD,
    database: 'mydatabase' 
  });
  
// inquirer.prompt([{name:'main',message:'what would you like to do ?'}]).then(function(answers){
//     console.log(answers.main);
// })

const answer = await select({
    message: 'Select a package manager',
    choices: [
      {
        name: 'npm',
        value: 'npm',
        description: 'npm is the most popular package manager',
      },
      {
        name: 'yarn',
        value: 'yarn',
        description: 'yarn is an awesome package manager',
      },
      {
        name: 'jspm',
        value: 'jspm',
        disabled: true,
      },
    ],
  });
  
// connection.promise().query("SELECT * from department")
//   .then( ([rows,fields]) => {
//     console.table(rows);
//   })
//   .catch(console.log)
//   .then( () => connection.end());

  