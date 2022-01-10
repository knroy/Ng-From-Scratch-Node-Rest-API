let buildInsertQuery = (tableName, jsonObject) => {

    let keys = Object.keys(jsonObject);
    let values = [];
    let placeHolder = []
    keys.forEach(key => {
        values.push(jsonObject[key]);
        placeHolder.push('?');
    });

    let query = `INSERT INTO  ${tableName}(${keys.join(', ')}) VALUES(${placeHolder.join(', ')})`;
    return {
        query: query,
        fields: values
    }
}

let simpleReadQuery = (tableName, fields, condition = null, limit = 10) => {
    let query = `SELECT ${fields.join(", ")} FROM ${tableName}`;
    if (condition) {
        query += ` WHERE ${condition}`;
    }
    if (limit > 0) {
        query += ` LIMIT ${limit}`;
    }
    return query;
}

module.exports = {
    buildInsertQuery: buildInsertQuery,
    simpleReadQuery: simpleReadQuery
}
