DROP DATABASE IF EXISTS employeetracker_DB;
CREATE DATABASE employeetracker_DB;

USE employeetracker_DB;

CREATE TABLE employee (
    employeeID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL,
    roleID INT NOT NULL,
    managerID INT,
    FOREIGN KEY (roleID) REFERENCES role(roleID),
    FOREIGN KEY (managerID) REFERENCES department(departmentID)
);

CREATE TABLE role (
    roleID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL,
    departmentID INT
    FOREIGN KEY (departmentID) REFERENCES department(departmentID)
);

CREATE TABLE department (
    roleID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
    salary DECIMAL,
    departmentID INT,
    FOREIGN KEY (departmentID) REFERENCES department (departmentID)
);