const inquirer = require("inquirer");
const db = require("./db/queries");
const connection = require("./db/connection");

//write some inquirer prompts 
const startInquirer = () => {
    inquirer
      .prompt({
        name: "employee",
        type: "list",
        message: "Please select one of the following",
        choices: [
        "View employees", 
        "View departments", 
        "View roles", 
        "Add employee", 
        "add department",
        "Add role", 
        "Update employees role", 
        "End",
        ],
    })
    .then((answer) => {
      switch (answer.employee) {
        case "View employees":
          viewEmployees();
          startInquirer();
          break;

        case "View departments":
          viewDepartment();
          break;

        case "View roles":
          viewRoles();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "add department":
          addDepartment();
          break;

        case "Add role":
          addRole();
          break;  

        case "Update employees role":
          updateRole();
          break;
       
        case "End":
          db.connection.end();
          break;
      }
    });
};   

//write add employee function
async function addEmployee() {
  let employee = await inquirer
      .prompt([
          {
              name: 'first_name',
              type: 'input',
              message: 'Employee First Name:',

          },
          {
              name: 'last_name',
              type: 'input',
              message: 'Employee Last Name:',
          },
          {
              name: 'role_id',
              type: 'input',
              message: 'Role ID:',
          },
          {
              name: 'manager_id',
              type: 'input',
              message: 'Manager ID:',
          }
      ]);

  let employees = await db.addEmployee(employee);
  console.log(employees.affectedRows + " employee added.");
  startInquirer();
};

//write a function to add a department
async function addDepartment() {
    let newDepartment = await inquirer
        .prompt({
            name: 'name',
            type: 'input',
            message: 'Please add a department',
        })
    let employees = await db.addDepartment(newDepartment);
    console.log(employees.affectedRows + "Department has been added.");
    startInquirer();
};

//write add role function
async function addRole() {
  let role = await inquirer
      .prompt([
          {
              name: 'title',
              type: 'input',
              message: 'Choose a Role',

          },
          {
              name: 'salary',
              type: 'input',
              message: 'Choose a Salary',

          },
          {
              name: 'department_id',
              type: 'input',
              message: 'Choose a department ID',

          },
      ]);
async function employeeRoleUpdate(employees); {
  
  let role = await inquirer
      .prompt([
          {
              name: 'employee',
              type: 'input',
              message: 'Enter the id of the employee you would like to update.'
      ]);
      .then((answer) => {

        
      }
  let employeeRole = await db.addRole(role);
  console.log(employeeRole.affectedRows + "Role has been updated.");
  startInquirer();
};

//write a function to view employees using findall
async function viewEmployees() {
    let employees = await db.findAllEmployees();
    console.log(employees);
    startInquirer();
};

//write a function to view department 
async function viewDepartment() {
    let department = await db.viewDepartment();
    console.log(department);
    startInquirer();
};

//write function to view roles
async function viewRoles() {
  let role = await db.viewRoles();
  console.table(role);
  startInquirer();
};

//write a function to update role of an employee ******HOW WILL THIS DIFFER FROM ADD ROLE???********
async function updateRole() {
    let employees = await db.getEmployeeRoleData();
    console.log(employees);
    // employeeRoleUpdate(employees);
};


startInquirer();