const sql = require('mysql2/promise')

const util = {

    async getDepartments() {
        // connect to db
        const connec = await sql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '#queryparams32',
            database: 'company'
        })

        // return an object from departments table
        const [rows, fields] = await connec.query(
            `SELECT name FROM departments`
        )

        return rows
    },

    async getRoles() {
        // connect to db
        const connec = await sql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '#queryparams32',
            database: 'company'
        })

        // return an object from departments table
        const [rows, fields] = await connec.query(
            `SELECT title FROM roles`
        )

        return rows
    },

    async getEmployees() {
        // connect to db
        const connec = await sql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '#queryparams32',
            database: 'company'
        })

        // return an object from departments table
        const [rows, fields] = await connec.query(
            `SELECT first_name, last_name FROM employees`
        )

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
        }
    ],

    update: [
        {
            name: 'empname',
            type: 'list',
            choices: [],
            message: 'Which employee'
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