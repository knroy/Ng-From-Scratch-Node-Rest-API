const asyncHandler = require('express-async-handler')

const database = require("../database");

const dbConnection = database().getConnection();

let categoriesApi = async (req, res) => {

}

let initCategoriesApi = (app) => {
    app.get('/categories', asyncHandler(categoriesApi));
}

module.exports = initCategoriesApi;
