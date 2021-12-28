const asyncHandler = require('express-async-handler')

const database = require("../database");

const dbConnection = database().getConnection();

let createBlogPostApi = async (req, res) => {

    let params = req.body;

    let blogTitle = params.title;
    let blogDescription = params.description;
    let categories = params.categories || []


}

let initCreateBlogPostApi = (app) => {
    app.post('/blog/create', asyncHandler(createBlogPostApi));
}

module.exports = initCreateBlogPostApi;
