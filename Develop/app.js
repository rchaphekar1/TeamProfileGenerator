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
        ]);

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
    employeeArray += manager;
    if (data.additionalMembers == 'Engineer') {
        engineerQuestions();
    } else if (data.additionalMembers == 'Intern') {
        internQuestions();
    };
};

function getEngineerInput(data) {
    let engineer = new Engineer(data.name, data.id, data.email, data.github);
    employeeArray += engineer;
    if (data.additionalMembers == 'Engineer') {
        engineerQuestions();
    } else if (data.additionalMembers == 'Intern') {
        internQuestions();
    };
};

function getInternInput(data) {
    let intern = new Intern(data.name, data.id, data.email, data.school);
    employeeArray += intern;
    if (data.additionalMembers == 'Engineer') {
        engineerQuestions();
    } else if (data.additionalMembers == 'Intern') {
        internQuestions();
    };
};

function init() {
    startApplication()
        .then((data) => getManagerInput(data));
    render(employeeArray, outputPath);
};

init();

            // {
            //     type: 'input',
            //     name: githubID,
            //     message: 'What is their Github username?',
            // },
            // {
            //     type: 'input',
            //     name: school,
            //     message: 'What school are they attending?',
            // },
       

// const manager = (data) => 
// `<div class="card employee-card">
//     <div class="card-header">
//         <h2 class="card-title">${data.name}</h2>
//         <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${data.role}</h3>
//     </div>
//     <div class="card-body">
//         <ul class="list-group">
//             <li class="list-group-item">ID: ${data.id}</li>
//             <li class="list-group-item">Email: <a href="mailto:${data.email}">${data.email}</a></li>
//             <li class="list-group-item">Office number: ${data.officeNumber}</li>
//         </ul>
//     </div>
// </div>`;

// const engineer = (data) => 
// `<div class="card employee-card">
//     <div class="card-header">
//         <h2 class="card-title">${data.name}</h2>
//         <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>${data.role}</h3>
//     </div>
//     <div class="card-body">
//         <ul class="list-group">
//             <li class="list-group-item">ID: ${data.id}</li>
//             <li class="list-group-item">Email: <a href="mailto:${data.email}">${data.email}</a></li>
//             <li class="list-group-item">GitHub: <a href="https://github.com/${data.githubID}" target="_blank" rel="noopener noreferrer">${data.githubID}</a></li>
//         </ul>
//     </div>
// </div>`;

// const intern = (data) => 
// `<div class="card employee-card">
//     <div class="card-header">
//         <h2 class="card-title">${data.name}</h2>
//         <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${data.role}</h3>
//     </div>
//     <div class="card-body">
//         <ul class="list-group">
//             <li class="list-group-item">ID: ${data.id}</li>
//             <li class="list-group-item">Email: <a href="mailto:${data.email}">${data.email}</a></li>
//             <li class="list-group-item">School: ${data.school}</li>
//         </ul>
//     </div>
// </div>`;

// render([manager, engineer, intern]);

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
