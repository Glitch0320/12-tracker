const sql = require('mysql2')
require('dotenv').config()

const pool = sql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.SQL_PASS,
    database: 'company'
})

const connec = pool.promise()

const util = {

    async getDepartments() {

        // return an object from departments table
        const [rows, fields] = await connec.query(
            `SELECT name, id FROM departments`
        )
        
        return rows
    },

    async getRoles() {

        // return an object from departments table
        const [rows, fields] = await connec.query(
            `SELECT * FROM roles`
        )

        // Set rows to [{id:123}, {title:role}, {department:Department}, {salary:125000}] 
        for (let i = 0; i < rows.length; i++ ) {
            const [dname] = await connec.query(
                `SELECT name FROM departments WHERE id = ${rows[i].department_id}`)
                rows[i].department = dname[0].name
                delete rows[i].department_id
        }

        return rows
    },

    async getEmployees() {
        // return an object from departments table
        const [rows, fields] = await connec.query(
            `SELECT * FROM employees`
        )

        // Set rows to [{id:ids}, {first_name:names}, {last_name:names}, {role:roles}, {salary:salaries}]
        for (let i = 0; i < rows.length; i++) {
            const [edata] = await connec.query(
                `SELECT title, salary, department_id FROM roles WHERE id = ${rows[i].role_id}`
            )
            rows[i].role = edata[0].title
            rows[i].salary = edata[0].salary
            const [edata2] = await connec.query(
                `SELECT name FROM departments WHERE id = ${edata[0].department_id}`
            )
            if (rows[i].manager_id != null) {
                const [edata3] = await connec.query(
                    `SELECT first_name, last_name FROM employees WHERE id = ${rows[i].manager_id}`
                )
                rows[i].manager = `${edata3[0].first_name} ${edata3[0].last_name}`
            } else {
                rows[i].manager = 'none'
            }
            rows[i].department = edata2[0].name
            delete rows[i].role_id
            delete rows[i].manager_id
        }

        return rows
    },

    department: [
        {
            name: 'depname',
            type: 'input',
            message: 'Name of department'
        }
    ],

    role: [
    {
        name: 'rolname',
        type: 'input',
        message: 'Name of role'
    },
    {
        name: 'salary',
        type: 'number',
        message: 'Role salary'
    },
    {
        name: 'department',
        type: 'list',
        // This will have to be dynamically set to current departments
        choices: [],
        message: 'Which department does this role belong to?'
    }
    ],

    employee: [
        {
            name: 'first',
            type: 'input',
            message: 'First name'
        },
        {
            name: 'last',
            type: 'input',
            message: 'Last name'
        },
        {
            name: 'role',
            type: 'list',
            // This will have to be dynamically set to current roles
            choices: [],
            message: 'What is employee role?'
        },
        {
            name: 'manager',
            type: 'list',
            // This will have to be dynamically set to current roles
            choices: [],
            message: 'Does this employee have a manager?'
        }
    ],

    update: [
        {
            name: 'empname',
            type: 'list',
            choices: [],
            message: 'Which employee?'
        }
    ],

    roleList: [
        {
            name: 'roltitles',
            type: 'list',
            choices: [],
            message: 'What is their new role'
        }
    ]

}







module.exports = {
    util
}