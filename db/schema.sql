DROP DATABASE IF EXISTS employees,

CREATE DATABASE employees,

USE employees,

--department table--
CREATE TABLE department (
    --Your code here--
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20),
    PRIMARY KEY (id)
),
CREATE TABLE role (
    --Your code here--
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(20),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)
),
CREATE TABLE employee (
    --Your code here--
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);