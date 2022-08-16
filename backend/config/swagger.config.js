var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Nodejs Rest CRUD API with Swagger",
            version: "1.0.0",
            description:
                "This is a sample Rest CRUD API project using Node.js, Express, Postgres, Swagger, Mocha & Chai for testing",
            license: "",
            contact: {
                name: "Vincent Oti",
                url: "https://www.linkedin.com/in/vincent-oti-oden/"
            },
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["../routes/user.routes.js", "../routes/auth.routes.js"],
};

const swaggerSpecs = swaggerJsdoc(options);

exports.swaggerSpecs = swaggerSpecs;
exports.swaggerUi = swaggerUi; 