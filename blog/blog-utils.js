const database = require("../database");
const queryBuilder = require('../database/query-builder');

const dbConnection = database().getConnection();

const blogTable = 'BlogPosts';

let insertNewBlog = async (title, description, authorId) => {
    let categoryData = {
        Title: title,
        Description: description,
        AuthorId: authorId
    }

    let data = queryBuilder.buildInsertQuery(blogTable, categoryData);
    const [results, fields] = await dbConnection.execute(data.query, data.fields);
    return results.insertId;
}

let GetBlogs = async () => {

}


module.exports = {
    insertNewBlog: insertNewBlog
}
