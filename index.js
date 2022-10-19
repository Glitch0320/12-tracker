const inq = require('inquirer')
const sql = require('mysql2')
const constable = require('console.table')
const { util } = require('./assets/js/logic')

const pool = sql.createPool({
     host: 'localhost',
     user: 'root',
     password: '#queryparams32',
     database: 'company'
})

const connec = pool.promise()

// getRoles, getemployees, setDepartment, setRole, setEmployee, updateRole

let quit = false

// Questions for options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const options = [
     {
         name: 'options',
         type: 'list',
         choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee', 'Update employee role', 'Quit'],
         message: 'What would you like to do?'
     }
 ]

const init = async () => {
    do {
        
        // Ask what to do
        const choice = await inq.prompt(options)

        // 'View all departments', 'View all roles', 'View all Employees', 'Add department', 'Add role', 'Add employee', 'Update employee role', 'Quit'

        switch(choice.options) {
          // These three will return an array of objects and display them with console.table
            case 'View all departments':
               rows = await util.getDepartments()
               console.table(rows)
            break
            case 'View all roles':
                 rows = await util.getRoles()
                 console.table(rows)
            break
            case 'View all employees':
                 rows = await util.getEmployees()
                 console.table(rows)
            break

          // The remaining functions won't return anything
            case 'Add department':
               const { depname } = await inq.prompt(util.department)

               !depname ? console.log('Please provide name.') : connec.query(
               `INSERT INTO departments(id, name) VALUES(${Math.floor((1 + Math.random()) * 0x10000)}, '${depname}')`)
            break
            case 'Add role':
               // Update questions with current depnames
               const [rows1, fields1] = await connec.query(
                    `SELECT name FROM departments`
               )
               const temp = []
               rows1.forEach(obj => {
                    temp.push(obj.name)
               })
               util.role[2].choices = temp

               // Prompt for new role obj
               const { rolname, salary, department } = await inq.prompt(util.role)

               const [rows2, fields2] = await connec.query(
                   `SELECT id FROM departments WHERE name = '${department}'`
               ) 

               // Id of new role's department
               depId = rows2[0].id

               // Perform insert if all values true
               !rolname || !salary || !depId ? console.log('Invalid input.') : connec.query(
                    `INSERT INTO roles (id, title, salary, department_id) VALUES (${Math.floor((1 + Math.random()) * 0x10000)}, '${rolname}', ${salary}, ${depId})`)
            break
            case 'Add employee':
                 // Update questions with current role titles
               const [rows3, fields3] = await connec.query(
                    `SELECT title FROM roles`
               )

               const temp1 = []
               rows3.forEach(obj => {
                    temp1.push(obj.title)
               })
               util.employee[2].choices = temp1

               // Prompt for new employee obj
               const { first, last, role } = await inq.prompt(util.employee)

               const [rows4, fields4] = await connec.query(
                   `SELECT id FROM roles WHERE title = '${role}'`
               ) 

               // Id of new role's department
               rolId = rows4[0].id

               // Perform insert if all values true
               !first || !last || !rolId ? console.log('Invalid input.') : connec.query(
                    `INSERT INTO employees (id, first_name, last_name, role_id) VALUES (${Math.floor((1 + Math.random()) * 0x10000)}, '${first}', '${last}', ${rolId})`)
            break
            case 'Update employee role':
               // THEN I am prompted to select an employee to update and their new role and this information is updated in the database
               
               // update employee list
               const [rows5, fields5] = await connec.query(
                    `SELECT first_name, last_name FROM employees`
               )
               const temp2 = []
               rows5.forEach(obj => {
                    temp2.push(`${obj.first_name} ${obj.last_name}`)
               })
               util.update[0].choices = temp2

               const employeeName = await inq.prompt(util.update)
               const [firstName, lastName] = employeeName.empname.split(' ')

               // update role list
               const [rows6, fields6] = await connec.query('SELECT title FROM roles')
               const temp3 = []
               rows6.forEach(obj => {
                    temp3.push(obj.title)
               })
               util.roleList[0].choices = temp3

               const newRole = await inq.prompt(util.roleList)

               const [rows7, fields7] = await connec.query(
                    `SELECT id FROM roles WHERE title = '${newRole.roltitles}'`
                ) 

                // Id of new role's department
                newRolId = rows7[0].id
 
                // Perform insert if all values true
                !firstName || !lastName || !newRolId ? console.log('Invalid input.') : connec.query(
                     `UPDATE employees SET role_id = ${newRolId} WHERE first_name = '${firstName}' AND last_name = '${lastName}'`)

            break
            default:
                quit = true
            break
        }

    } while (!quit)

}

init()