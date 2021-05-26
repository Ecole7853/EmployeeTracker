const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection
    }

    findAllEmployees() {
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT join employee manager on manager.id = employee.manager_id;");
    }

    viewRoles() {
        return this.connection.query(
            "SELECT * FROM role"
        );
    }

    viewDepartment() {
        return this.connection.query(
            "SELECT * FROM department"
        );
    }
    
    addDepartment(department) {
        return this.connection.query(
            "INSERT INTO department SET ?", department
        );
    }
    
    addRole(role) {
        return this.connection.query(
            "INSERT INTO role SET ?", role
        );
    }
    
    addEmployee(employee) {
        return this.connection.query(
            "INSERT INTO employee SET ?", employee
        );
    }

    updateEmployeeRole() {
        return this.connection.query(
            "UPDATE employee SET {column name} = ? WHERE {column name} = ?", role
        );
    }
    
};

module.exports = new DB(connection);