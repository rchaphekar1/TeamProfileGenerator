const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let employeeArray = [];

const startApplication = () =>
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the team manager name?',
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is their employee id?',
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is their email?',
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: 'What is their office number?',
            },
            {
                type: 'checkbox',
                name: 'additionalMembers',
                message: 'Please select a new team member to add.',
                choices: ['Engineer', 'Intern', 'None'],
            },
        ]).then((data) => getManagerInput(data));

const engineerQuestions = () => 
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is their name?',
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is their employee id?',
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is their email?',
            },
            {
                type: 'input',
                name: 'github',
                message: 'What is their Github username?',
            },
            {
                type: 'checkbox',
                name: 'additionalMembers',
                message: 'Please select a new team member to add.',
                choices: ['Engineer', 'Intern', 'None'],
            },
        ]).then((data) => getEngineerInput(data));;

const internQuestions = () => 
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is their name?',
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is their employee id?',
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is their email?',
            },
            {
                type: 'input',
                name: 'school',
                message: 'What is their school?',
            },
            {
                type: 'checkbox',
                name: 'additionalMembers',
                message: 'Please select a new team member to add.',
                choices: ['Engineer', 'Intern', 'None'],
            },
        ]).then((data) => getInternInput(data));;

function getManagerInput(data) {
    let manager = new Manager(data.name, data.id, data.email, data.officeNumber);
    employeeArray.push(manager);
    console.log(employeeArray);
    if (data.additionalMembers == 'Engineer') {
        engineerQuestions();
    } else if (data.additionalMembers == 'Intern') {
        internQuestions();
    } else if (data.additionalMembers == 'None') {
        generateHTML(employeeArray);
    };
};

function getEngineerInput(data) {
    let engineer = new Engineer(data.name, data.id, data.email, data.github);
    employeeArray.push(engineer);
    console.log(employeeArray);
    if (data.additionalMembers == 'Engineer') {
        engineerQuestions();
    } else if (data.additionalMembers == 'Intern') {
        internQuestions();
    } else if (data.additionalMembers == 'None') {
        generateHTML(employeeArray);
    };
};

function getInternInput(data) {
    let intern = new Intern(data.name, data.id, data.email, data.school);
    employeeArray.push(intern);
    console.log(employeeArray);
    if (data.additionalMembers == 'Engineer') {
        engineerQuestions();
    } else if (data.additionalMembers == 'Intern') {
        internQuestions();
    } else if (data.additionalMembers == 'None') {
        generateHTML(employeeArray);
    };
};

function generateHTML(employeeArray) {
    fs.writeFile(outputPath, render(employeeArray), function(err) {
        if (err) throw err;
        console.log('Successfully wrote to HTML!');
    });
};

startApplication();