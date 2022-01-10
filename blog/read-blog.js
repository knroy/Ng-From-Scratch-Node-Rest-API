const asyncHandler = require('express-async-handler')

const database = require("../database");

const queryBuilder = require('../database/query-builder');

const dbConnection = database().getConnection();

let blogsApi = async (req, res) => {
    let tableName = 'BlogPosts';
    let fields = ['id', 'Title', 'Description', 'AuthorId'];
    let query = queryBuilder.simpleReadQuery(tableName, fields);
    const [results, _] = await dbConnection.execute(query);
    res.json(results);
}

let initBlogsApi = (app) => {
    app.get('/blogs', asyncHandler(blogsApi));
}

module.exports = initBlogsApi;
