const bcrypt = require("bcrypt");
const asyncHandler = require('express-async-handler')

const database = require("../database");

const dbConnection = database().getConnection();

let loginApi = async (req, res) => {
    let params = req.body;

    let email = params.Email;
    let password = params.Password;

    if (!email || !password) {
        res.status(400).json({
            message: 'Email or Password is missing',
            status: 400,
        });
    } else {

        const query = "SELECT * FROM Users where Email=?";
        const fields = [email];

        try {
            const [results, _] = await dbConnection.execute(query, fields);
            if (results && results.length > 0) {

                let user = results[0];
                let enPass = user.EnCryptedPassword;
                let salt = user.PasswordSalt;

                let hash = bcrypt.hashSync(password, salt);

                if (hash !== enPass) {
                    res.status(400).json({
                        message: 'Invalid Password',
                        status: 200
                    })
                } else {
                    res.json({
                        message: 'Login Success',
                        status: 200
                    })
                }
            } else {
                res.status(400).json({
                    message: 'Invalid Credentials',
                    status: 200
                })
            }


        } catch (e) {
            res.status(400).json({
                message: e.message,
                status: 200
            })
        }

    }
}

let initLoginApi = (app) => {

    app.post('/login', asyncHandler(loginApi));
}

module.exports = initLoginApi;
