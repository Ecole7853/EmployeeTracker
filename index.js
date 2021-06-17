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
        "Delete department",
        "End",
        ],
    })
    .then((answer) => {
      switch (answer.employee) {
        case "View employees":
          viewEmployees();
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
        
        case "Delete department":
          deleteDepartment();
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

  let employees = await db.addEmployeeId(employee);
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
    let employees = await db.addDepartmentId(newDepartment);
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
      let roles = await db.addRoleId(role);
    console.log(roles.affectedRows + "Role has been added.");
    startInquirer();
    }

//write a function to view employees using findall
async function viewEmployees() {
    let employees = await db.findAllEmployees();
    console.table(employees);
    startInquirer();
};

//write a function to view department 
async function viewDepartment() {
    let department = await db.viewDepartment();
    console.table(department);
    startInquirer();
};

//write function to view roles
async function viewRoles() {
  let role = await db.viewRoles();
  console.table(role);
  startInquirer();
};

//write a function to update role of an employee
async function updateRole() {
    // let employees = await db.findAllEmployees();
    let employees = await db.getEmployeeRoleData();
    console.table(employees);
    let allRoles = await db.viewRoles();
    console.table(allRoles);
    let roleList = allRoles.map(role => ({
      value: role.id, 
      name: role.title
    }))
    let employeeList = employees.map(employee => ({
      value: employee.id, 
      name: employee.first_name + " " + employee.last_name
    }))
    inquirer
          .prompt([{
            type: "list",
            name: "Chosen_employee",
            message: "Which employee would you like to update?",
            choices: employeeList,
          },
        {
          type: "list",
          name: "Chosen_role",
          message: "Which role would you like to choose?",
          choices: roleList,
        }]).then(answer => {
          console.log(answer);
          db.updateRole(answer.Chosen_employee, answer.Chosen_role);
          console.log("Employee updated sucessfully!")
          startInquirer();
          })
        };

async function deleteDepartment() {
  let departments = await db.viewDepartment();
  let departmentList = departments.map(department => ({
    value: department.id,
    name: department.name,
  }));
  inquirer
      .prompt([{
        type: "list",
        name: "Chosen_department",
        message: "Which department would you like to delete",
        choices: departmentList,
      }]).then(answer => {
        console.log(answer);
        db.deleteDepartments(answer.Chosen_department)
        console.log("Department deleted");
        startInquirer();
      });    
}


startInquirer();