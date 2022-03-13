const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "password",
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

inquirer.prompt([{
  message: 'What would you like to do?',
  type: 'list',
  name: 'choice',
  choices: [
      'View all Employees',
      'View all Departments',
      'View all Roles',
      'View all Employees by Department',
      'Add Employee',
      'Update Employee',
      'Remove Employee',
      'Add Role',
      'Update Role',
      'Delete Role',
      'Add Department',
      'Update Department',
      'Delete Department'
  ]
}])
  .then((answers) => {
      if (answers.choice === 'View all Employees') {
          connection.query(`SELECT employee.firstName, 
          employee.lastName,
          role.title AS Title,
          role.salary AS Salary,
          department.name AS Department
      FROM employee 
          INNER JOIN role ON employee.roleID=role.roleID
          INNER JOIN department ON employee.roleID=department.departmentID`, (err, result) => {
              if (err) throw err;
              console.table(result);
          })
      }
  })