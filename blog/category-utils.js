const database = require("../database");
const queryBuilder = require('../database/query-builder');

const dbConnection = database().getConnection();

const categoryTable = 'Categories'

let insertCategory = async (categoryName) => {

    let categoryData = {
        Name: categoryName
    }

    let data = queryBuilder.buildInsertQuery(categoryTable, categoryData);
    const [results, fields] = await dbConnection.execute(data.query, data.fields);
    return results.insertId;
}

let isCategoryNameAlreadyExists = async (categoryName) => {
    let categoryToLower = categoryName.toLowerCase();
    const query = `SELECT id, Name FROM ${categoryTable} where Name=?`;
    const fields = [categoryToLower];
    const [results, _] = await dbConnection.execute(query, fields);
    return results.length > 0 ? results[0].id : -1;
}


module.exports = {
    isCategoryNameAlreadyExists: isCategoryNameAlreadyExists,
    insertCategory: insertCategory
}
