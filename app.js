const inquirer = require('inquirer');
const mysql = require('mysql');
// const consoleTable = require('console.table');
// const { Hash } = require('crypto');
const figlet = require('figlet');
//const chalk = require('chalk');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "password",
    database: "employeetracker_DB"
})  

// const seedQuery = fs.readFileSync("db/employeeTrackerSeeds.sql", {
//   econding: "utf-8",
// });

// connection.query(seedQuery, [hash], err => {
//   if (err) {
//     throw err
//   }
//   console.log("sql seed complete")
//   connection.end()
// })

connection.connect((err) => {
    if (err) {
        console.error(`connection error`, err.stack);
        return
    }
    console.log(`connected ${connection.threadID}`);
})

// connection.query('SELECT * FROM employee', (err, result) => {
//     if (err) throw err;
//     console.log(result);
// })

function initalPrompt() {
  figlet('Employee Tracker', function (err, data) {
    if (err) {
      console.log('error');
      console.dir(err);
      return;
  }
  //console.log(chalk.yellow(data))
});

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
        viewAllEmployees();
      } else if (answers.choice === 'View All Employees by Department') {
        viewByDept();
    } else if (answers.choice === 'View All Employees by Role') {
        viewByRole();
    } else if (answers.choice === 'Add Employee') {
        addEmployee();
    }
  })
};

initalPrompt();

function viewAllEmployees() {
  connection.query(`SELECT employee.firstName, 
    employee.lastName,
    role.title AS Title,
    role.salary AS Salary,
    department.name AS Department
   FROM employee 
    INNER JOIN role ON employee.roleID=role.roleID
    INNER JOIN department ON 
    employee.roleID=department.departmentID`, (err, result) => {
      if (err) throw err;
      console.table(result);
  });  
  initalPrompt();
};

function viewAllDepartemnts() {
  inquirer.prompt([{
    message: "Which department would you like to view?",
    type: 'list',
    name: 'dept',
    choices: [
        'Engineering',
        'Management',
        'Sales',
        'Legal'
    ]
}])
    .then((answers) => {
        connection.query(`SELECT 
        employee.firstName,
        employee.lastName,
        department.name AS Department
    FROM employee
        INNER JOIN role ON employee.roleID=role.roleID     
        INNER JOIN department ON employee.roleID=department.departmentID
        WHERE department.name='${answers.dept}'`, (err, result) => {
            if (err) throw err;
            console.table(result);
        })
    })
}

function viewAllRoles() {
  inquirer.prompt([{
    message: "Which roles would you like to view?",
    type: 'list',
    name: 'role',
    choices: [
        'Junior Developer',
        'Senior Developer',
        'Sales Lead',
        'Lawyer'
    ]
}])
    .then((answers) => {
        connection.query(`SELECT 
        employee.firstName,
        employee.lastName,
        role.title AS Title
    FROM employee
        INNER JOIN role ON employee.roleID=role.roleID     
        INNER JOIN department ON employee.roleID=department.departmentID
        WHERE role.title='${answers.role}'`, (err, result) => {
            if (err) throw err;
            console.table(result);
        })
    })
}

function viewAllEmployeesByDepartment() {

}

function addEmployee() {
  roles = [
    'Senior Engineer',
    'Junior Engineer',
    'Sales Person',
    'Lawyer'
];
inquirer.prompt([
    {
        message: "Employee's role?",
        type: 'list',
        name: 'role',
        choices: roles
    },
    {
        message: "Employee's first name?",
        type: 'input',
        name: 'firstName',
    },
    {
        message: "Employee's last name?",
        type: 'input',
        name: 'lastName',
    },
])
    .then((answers) => {
        connection.query(`
        INSERT INTO employee SET ?`,
                {
                    firstName: answers.firstName,
                    lastName: answers.lastName,
                    roleID: roles.indexOf(answers.role) + 1 
                },
                (err, result) => {
                if (err) throw err;
            console.table(result);
        })
        console.log(answers.role);
      })
}

function updateEmployee() {

}

function removeEmployee() {

}

function addRole() {

}

function updateRole() {

}

function deleteRole() {

}

function addDept() {

}

function updateDept() {

}

function deleteDept() {

}
