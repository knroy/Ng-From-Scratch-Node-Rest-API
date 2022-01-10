const database = require("../database");
const queryBuilder = require('../database/query-builder');

const dbConnection = database().getConnection();

const table = 'BlogCategories';

let InsertBlogCategory = async (blogId, categoryId) => {

    let BlogCategoryData = {
        BlogId: blogId,
        CategoryId: categoryId
    }

    let data = queryBuilder.buildInsertQuery(table, BlogCategoryData);
    const [results, fields] = await dbConnection.execute(data.query, data.fields);
}


module.exports = {
    InsertBlogCategory: InsertBlogCategory
}
