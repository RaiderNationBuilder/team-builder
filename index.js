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

function mainQuestions() {
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
        } else if (answer.type === "Finish-Team") {
            renderHtml(answer)
        } else if (answer.type === "Engineer") {
            engineerQuestions(answer)
        }
    })
}

function internQuestions(previousData) {
    console.log("Time to ask intern questons.")
    // inquiere prompt
    inquirer.prompt({
        type: "input",
        name: "school",
        message: "whats your school?"
    }).then(function (answers) {
        console.log(answers, previousData)
        // make the inter
        var intern = new Intern(previousData.name, previousData.id, previousData.email, answers.school)
        team.push(intern)
        addAnother()
    })
}

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
        addAnother()
    })
}

function engineerQuestions() {
    console.log("Time to ask engineer questons.")
}

function addAnother() {
    inquirer.prompt({
        type: "confirm",
        name: "addAnother",
        message: "Would you like to add another employee?"
    }).then(function (answer) {
        if (answer.addAnother) {
            mainQuestions()
        } else {
            console.log("time to make HTML")
        }
    })
}

mainQuestions()