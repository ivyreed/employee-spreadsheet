const Server = require('./server.js')
const fs = require("fs");
const inquirer = require('inquirer');

async function askUser() {
    let option = await inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
            name: 'input'
        },
    ]).then(answers => {
        return answers.input;
    });

    switch (option) {
        case 'view all departments':
            const results = await Server.work_db.promise().query('select * from department');
            console.table(results[0]);
            askUser();
            break;

        case 'view all roles':
            const roleResults = await Server.work_db.promise().query('select role.title, role.salary, department.name As department from role left join department on role.department_id = department.id;')
            console.table(roleResults[0])
            askUser();
            break;

        case 'view all employees':
            const empResults = await Server.work_db.promise().query('select employee.first_name, employee.last_name, role.title, role.salary, department.name as department from employee left join role on employee.role_id = role.id left join department on role.department_id = department.id;')
            console.table(empResults[0])
            askUser();
            break;
        case 'add a department':
            let answer = await inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the name of the department you would like to add?',
                    name: 'department'
                },]).then(answers => {
                    return answers.department
                })
            Server.work_db.query(`insert into department (name) VALUES ('${answer}');`)
            console.log(`${answer} was added to departments!`)
            askUser()
            break;

        case 'add a role':
            let depArray = []
            let departments = await Server.work_db.promise().query('select * from department')
            for (const d of departments[0]) {
                depArray.push({
                    value: d.id,
                    name: d.name
                })
            }
            let answer2 = await inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the name of the role you would like to add?',
                    name: 'role'
                },
                {
                    type: 'input',
                    message: 'what is the salary of this role?',
                    name: 'salary'
                },
                {
                    type: 'list',
                    message: 'what department does this role belong to?',
                    choices: depArray,
                    name: 'department'
                }]).then(answers => {
                    return answers
                })
            Server.work_db.query(`insert into role (title, salary, department_id) values ('${answer2.role}', ${answer2.salary}, ${answer2.department})`)
            console.log(`${answer2.role} was added to roles!`)
            askUser();
            break;

        case 'add an employee':
            let rolesArray = []
            let roles1 = await Server.work_db.promise().query('select * from role')
            for (const r of roles1[0]) {
                rolesArray.push({
                    value: r.id,
                    name: r.title
                })
            }
            let humansArray = []
            let employes = await Server.work_db.promise().query('select * from employee')
            for (const e of employes[0]) {
                humansArray.push({
                    value: e.id,
                    name: e.first_name + ' ' + e.last_name
                })
            }
            let answer4 = await inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the first name of the employee you would like to add?',
                    name: 'first'
                },
                {
                    type: 'input',
                    message: 'What is the last name of the employee you would like to add?',
                    name: 'last'
                },
                {
                    type: 'list',
                    message: 'what role do you want to give this employee?',
                    choices: rolesArray,
                    name: 'role'
                },
                {
                    type: 'list',
                    message: 'What is the manager of the employee you would like to add?',
                    choices: humansArray,
                    name: 'manager'
                }]).then(answers => {
                    Server.work_db.query(`insert into employee (first_name, last_name, role_id, manager_id) values ('${answers.first}', '${answers.last}', '${answers.role}', '${answers.manager}');`)
                    console.log(`${answers.first} was added to employees!`)
                })

            askUser()
            break;

        case 'update an employee role':
            let roleArray = []
            let roles = await Server.work_db.promise().query('select * from role')
            for (const r of roles[0]) {
                roleArray.push({
                    value: r.id,
                    name: r.title
                })
            }

            let humanArray = []
            let employees = await Server.work_db.promise().query('select * from employee')
            for (const e of employees[0]) {
                humanArray.push({
                    value: e.id,
                    name: e.first_name + ' ' + e.last_name
                })
            }

            let answer3 = await inquirer.prompt([
                {
                    type: 'list',
                    message: 'What employee would you like to change?',
                    choices: humanArray,
                    name: 'human'
                },
                {
                    type: 'list',
                    message: 'what role do you want to give this employee?',
                    choices: roleArray,
                    name: 'role'
                }
            ]).then(answers => {
                // console.log(`UPDATE employee SET role_id = ${answers.role}  WHERE id = ${answers.human}`)
                Server.work_db.query(`UPDATE employee SET role_id = ${answers.role}  WHERE id = ${answers.human}`)
                console.log(`${answers.human}'s role was changed to ${answers.role}`)
                askUser();
            })
            break;
    }

}
askUser();