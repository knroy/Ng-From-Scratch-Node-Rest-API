const bcrypt = require("bcrypt");
const database = require("../database");
const queryBuilder = require('../database/query-builder');


const dbConnection = database().getConnection();

let initRegistrationApi = (app) => {

    app.post('/register', (req, res) => {
        let params = req.body;

        let email = params.Email;
        let password = params.Password;
        let firstName = params.FirstName;
        let lastName = params.LastName;
        let phoneNumber = params.PhoneNumber;

        if (!email || !password || !firstName || !lastName || !phoneNumber) {
            res.status(400).json({
                message: 'missing required fields',
                status: 400,
            });
        } else {

            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);

            const obj = {
                Email: email,
                FirstName: firstName,
                LastName: lastName,
                EnCryptedPassword: hash,
                PasswordSalt: salt,
                PhoneNumber: phoneNumber
            }

            let data = queryBuilder.buildInsertQuery('Users', obj);

            dbConnection.query(data.query, data.fields, (err, results, fields) => {

                if (err) {

                    res.status(400).json({
                        message: 'registration failed',
                        status: 400,
                    });

                } else {
                    res.json({
                        message: 'registration complete',
                        status: 200
                    })
                }
            })
        }
    });
}

module.exports = initRegistrationApi;
