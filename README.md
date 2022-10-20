# Employee Tracker

## Description
This program allows a user to interact with a database containing information about a company via the command line.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation
Ensure you have node and mysql installed and clone this repo to your local machine. Using mysql workbench or something similar, run the commands in schema.db so that the database is set up on your machine. Create a new file in the root called '.env' and add SQL_PASS='yourpasswordhere'

## Usage
In a terminal window like git bash or powershell, navigate to the root of the cloned repo. Run node index and cycle through the options with the arrow keys. Press enter to choose and answer each prompt if requested.

## Video
<a href='https://drive.google.com/file/d/1agxVCaiRwHxcjprhe6VCZMBo3y6rabU5/view'>Tutorial Video</a>

## Credits
N/A

### Collaborators
<a href='https://github.com/Glitch0320/'>Glitch0320</a>

### Third Party Attribution
N/A

### Resources
<a href='https://www.npmjs.com/package/mysql2'>mysql2 npm</a>
<a href='https://www.npmjs.com/package/inquirer'>inquirer npm</a>
<a href='https://www.npmjs.com.package/console.table'>console.table npm</a>

## License
Liscensed under the MIT liscense.

## Features
### View all departments
    See a list of department names and ids.
### View all roles
    See a list of job titles with their department, salary, and id listed.
### View all employees
    See a list of employees with their full name, job title and department, salary, and their manager if applicable.
### Add department
    Add a new department name to the database.
### Add role
    Add a new role with it's department and salary.
### Add employee
    Add a new employee with their full name, role, and manager if applicable.
### Update employee role
    Change the role for a current employee.

## How to Contribute
Fork this repo or clone it and push up your changes.

## Tests
N/A

## Questions
Contact me by email: glitch0320@gmail.com

---