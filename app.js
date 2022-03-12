const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "root",
    database: "employeetracker_DB"
})

connection.connect((err) => {
    if (err) {
        console.error(`connection error`, err.stack);
        return
    }
    console.log(`connected ${connection.threadId}`);
})

connection.query('SELECT * FROM employee', (err, result) => {
    if (err) throw err;
    console.log(result);
})