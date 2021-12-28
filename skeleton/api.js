const asyncHandler = require('express-async-handler')

const database = require("../database");

const dbConnection = database().getConnection();

let exampleApi = async (req, res) => {

}

let initExampleApi = (app) => {
    app.post('/login', asyncHandler(exampleApi));
}

module.exports = initExampleApi;
