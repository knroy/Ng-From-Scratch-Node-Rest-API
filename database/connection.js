const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ng-scratch'
});

let getConnection = () => {
    return connection.promise();
}

module.exports = () => {
    return {
        getConnection: getConnection
    }
}
