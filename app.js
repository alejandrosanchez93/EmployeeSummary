const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const dreamTeam = [];

const promptManager = [

    {
        type: "input",
        message: "Enter manager's name:",
        name: "managersName"

    },
    {
        type: "input",
        message: "Enter manager's ID:",
        name: "managersId"

    },
    {
        type: "input",
        message: "What is the manager's email?",
        name: "managersEmail"

    },
    {
        type: "input",
        message: "What is the manager's office number?",
        name: "officeNumber"

    }
];

function buildManager() {
    inquirer.prompt(promptManager).then(data => {
        const manager = new Manager(data.managersName, data.managersId, data.managersEmail, data.officeNumber);
        dreamTeam.push(manager);
        buildTeam();
    });
};

function buildTeam() {
    inquirer.prompt([
        {
            type: "list",
            name: "employeeRole",
            message: "Which employee would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "Done"
            ]
        }
    ])
        .then(data => {
            if (data.employeeRole === "Engineer") {
                buildEngineer();
            } else if (data.employeeRole === "Intern") {
                buildIntern();
            } else (outputTeam());
        });
};

function buildEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter engineer's name:",
            name: "engineersName"

        },
        {
            type: "input",
            message: "Enter engineer's ID:",
            name: "engineersId"

        },
        {
            type: "input",
            message: "Enter engineer's email:",
            name: "engineersEmail"

        },
        {
            type: "input",
            message: "Enter engineer's GitHub username:",
            name: "engineersGithub"

        }
    ])
        .then(data => {
            const engineer = new Engineer(data.engineersName, data.engineersId, data.engineersEmail, data.engineersGithub);
            dreamTeam.push(engineer);
            buildTeam();
        });
};

function buildIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter intern's name:",
            name: "internsName"

        },
        {
            type: "input",
            message: "Enter intern's ID:",
            name: "internsId"

        },
        {
            type: "input",
            message: "Enter intern's email:",
            name: "internsEmail"

        },
        {
            type: "input",
            message: "Enter intern's school:",
            name: "internsSchool"

        }
    ])
        .then(data => {
            const intern = new Intern(data.internsName, data.internsId, data.internsEmail, data.internsSchool);
            dreamTeam.push(intern);
            buildTeam();
        });
};

function outputTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(dreamTeam), "utf-8");
}

buildManager();

