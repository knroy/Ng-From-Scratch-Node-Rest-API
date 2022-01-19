const asyncHandler = require('express-async-handler')

const database = require("../database");

const queryBuilder = require('../database/query-builder');

const categoriesUtil = require('./category-utils');

const dbConnection = database().getConnection();

let blogsApi = async (req, res) => {
    let tableName = 'BlogPosts';
    let fields = ['id', 'Title', 'Description', 'AuthorId'];
    let query = queryBuilder.simpleReadQuery(tableName, fields);
    const [results, _] = await dbConnection.execute(query);
    for (let i = 0; i < results.length; i++) {
        let blogId = results[i].id;
        let categories = await categoriesUtil.getCategoriesByBlogId(blogId);
        results[i].Categories = categories.map(item => {
            return item.Name;
        });
    }
    res.json(results);
}

let initBlogsApi = (app) => {
    app.get('/blogs', asyncHandler(blogsApi));
}

module.exports = initBlogsApi;
