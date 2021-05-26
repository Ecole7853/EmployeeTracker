const inquirer = require("inquirer");
const db = require("./db/queries");

//write some inquirer prompts 
const startInquirer = () => {
    inquirer
      .prompt({
        name: "opening",
        type: "list",
        message: "Welcome! What would you like to do?",
        choices: [
          "View all employees",
          "View all employees by department",
          "View all employees by manager",
          "Add employees ",
          "Remove employees",
          "Update employee by role",
          "update employee manager",
          "Exit Application",
        ],
    })
    .then((answer) => {
      switch (answer.opening) {
        case "View all employees":
          viewEmployees();
          start();
          break;

        case "View all employees by department":
          getAllEmployeesbyDepartment();
          break;

        case "View all employees by manager":
          viewEmployeesByManager();
          break;

        case "Add employees ":
          addEmployee();
          break;

        case "Remove employees":
          removeEmployee();
          break;

        case "Update employee by role":
          updateEmployeesRole();
          break;

        case "update employee manager":
          updateEmployeeManager();
          break;

        case "Exit Application":
          db.connection.end();
          break;
      }
    });
};   

async function viewEmployees () {
    let employees = await db.findAllEmployees();
    console.log(employees);
}

viewEmployees();