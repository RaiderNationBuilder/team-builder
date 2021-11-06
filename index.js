const inquirer = require('inquirer')

const Intern = require('./lib/Intern')
const Manager = require('./lib/Manager')

const team = []


// var fakehtml = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>
// <body>

// </body>
// </html>
// `

function managerCheck(...team) {
   console.log('in managercheck function')
    for (let i = 0; i < team.length; i++) {
        console.log(team[i].getRole())
        if (team[i].getRole() != "Manager") {
            return true
        } 
    }
    return false
}

function mainQuestions() {
    if (!managerCheck()) {
        inquirer.prompt([
            {
                type: "input",
                name: "firstname",
                message: "Whats your first name?"
            },
            {
                type: "input",
                name: "email",
                message: "Whats your email address?"
            },
            {
                type: "input",
                name: "id",
                message: "Whats your id?"
            },
            {
                type: "list",
                name: "type",
                message: "Which employee would you like to make?",
                choices: [
                    "Intern",
                    "Manager",
                    "Engineer"
                ]
            }
        ]).then(function (answer) {
            if (answer.type === "Intern") {
                internQuestions(answer)
            } else if (answer.type === "Manager") {
                managerQuestions(answer)
            } else if (answer.type === "Engineer") {
                engineerQuestions(answer)
            }
        })
    }
}

function internQuestions(previousData) {
    console.log("Time to ask intern questons.")
    // inquier prompt
    inquirer.prompt({
        type: "input",
        name: "school",
        message: "whats your school?"
    }).then(function (answers) {
        console.log(answers, previousData)
        // make the intern
        var intern = new Intern(previousData.name, previousData.id, previousData.email, answers.school)
        team.push(intern)
        addAnother()
    })
}
// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number  DONE!!

// WHEN I enter the team manager’s name, employee ID, email address, and office number
// THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
function managerQuestions(previousData) {
    console.log("Time to ask manager questons.")
    inquirer.prompt({
        type: "input",
        name: "office",
        message: "What is the manager's office number?"
    }).then(function (answers) {
        console.log(answers, previousData)

        var manager = new Manager(previousData.name, previousData.id, previousData.email, answers.office)
        team.push(manager)
        console.log(manager.getRole())
        addAnother(manager.getRole())
    })
}

function engineerQuestions() {
    console.log("Time to ask engineer questons.")
}

function addAnother() {
    // var prevEmployee = lastEmployee
    inquirer.prompt({
        type: "confirm",
        name: "addAnother",
        message: "Would you like to add another employee?"
    }).then(function (answer) {
        if (answer.addAnother) {
            // console.log("line 113", lastEmployee)
            mainQuestions()
        } else {
            console.log("time to make HTML")
        }
    })
}

mainQuestions()