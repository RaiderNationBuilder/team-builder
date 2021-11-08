const inquirer = require('inquirer')
var fs = require('fs')

const Intern = require('./lib/Intern')
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')

const team = []
let name = ""
let title = ""
let id = ""
let email = ""
let special = ""


function addCard(card) {
console.log(card)
    name = card.name
    title = card.getRole()
    id = card.id
    email = card.email

    if (title === "Manager") {
        special = "Office #: " + title.office
    } else if (title === "Intern") {
        special = "School: " + card.school
    } else if (title === "Engineer") {
        special = `GitHub Id: <a href=${title.github} class=btn btn-primary>`
    }

    var html = `
    <div class="card" style="width: 10rem; border: 0.15em solid black; padding: 0.25em">
        <div class="card-body">
            <header>
                <h3 class="card-title" style="margin: 0">${name}</h3>
                <h4 style="margin: 0">${title}</h4>
            </header>
            <p class="card-text">ID:${id}</p>
            <p class="card-text">Email:${email}</p>
            <p class="card-text">${special}</p>            
        </div>  
    </div>  
    `
    return html
}

var fakeHtml = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
        integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13"
        crossorigin="anonymous"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project Roster</title>
</head>

<body style="margin: 0">
    <header style="background-color: red; height: 7em">
        <h1 style="color: white; text-align: center; line-height: 3.5em;">My Team</h1>
    </header>
    <div style="display: flex; flex-wrap: wrap; align-content: stretch; justify-content: space-around;">
`

const endHtml = `
    </div>

</body>

</html>
`

function mainQuestions() {
    console.log(team.length)
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
        var intern = new Intern(previousData.firstname, previousData.id, previousData.email, answers.school)
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
        console.log("in managerQuestons() line 93", answers, previousData)
        var manager = new Manager(previousData.firstname, previousData.id, previousData.email, answers.office)
        team.push(manager)
        console.log("line 97", team.length)
        addAnother()
    })
}

// WHEN I select the engineer option
// THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
function engineerQuestions(previousData) {
    console.log("Time to ask engineer questons.")
    inquirer.prompt({
        type: "input",
        name: "gitHub",
        message: "What is the engineer's GitHub user name?"
    }).then(function (answers) {
        console.log("in managerQuestons() line 93", answers, previousData)
        var engineer = new Engineer(previousData.firstname, previousData.id, previousData.email, answers.github)
        team.push(engineer)
        console.log("line 113", team.length)
        addAnother()
    })
}

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function (err) {
        console.log(err)
    })
}

<<<<<<< HEAD
fs.open('index.html', 'wx+', function (err, f) {
    console.log('Saved!');
  });
=======
function renderHtml() {
    var card = ""
    for (let i = 0; i < team.length; i++) {
        card += addCard(team[i])
        console.log(card)
    }
    fakeHtml += card
    fakeHtml += endHtml

    writeToFile("index.html", fakeHtml)
}
>>>>>>> feature/openFile

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
<<<<<<< HEAD
            writeToFile("index.html", fakeHtml)
            fs.open('index.html')
=======
            renderHtml()
>>>>>>> feature/openFile
        }
    })
}

mainQuestions()