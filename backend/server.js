const express = require("express"); // import the express module for building rest apis
const cors = require("cors"); // cross origin resource sharing
const bodyParser = require("body-parser"); // to parse request
const app = express(); // create an express app
const port = process.env.PORT || 8080; // set the default port
require('dotenv').config();



let corOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corOptions));
app.use(bodyParser.json()) // parse the requests of content-type application/json
app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded


// import database configuration
const db = require("./models");
const Role = db.role;
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });

// route
app.get("/", (req, res) => {
    res.status(200).send({ "Message": "Welcome to SIS API" });
});
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/session.routes')(app);
require('./routes/department.routes')(app);
require('./routes/semester.routes')(app);
require('./routes/course.routes')(app);
require('./routes/section.routes')(app);
require('./routes/studentparentinfo.routes')(app);
require('./routes/student.routes')(app);
// set port and listen for request
app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });

    Role.create({
        id: 4,
        name: "student"
    });

    Role.create({
        id: 5,
        name: "teacher"
    });

    Role.create({
        id: 6,
        name: "librarian"
    });

    Role.create({
        id: 7,
        name: "hod"
    });

    Role.create({
        id: 8,
        name: "cordinator"
    });
}
