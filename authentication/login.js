const bcrypt = require("bcrypt");
const database = require("../database");

const dbConnection = database().getConnection();

let initLoginApi = (app) => {

    app.post('/login', (req, res) => {
        let params = req.body;

        let email = params.Email;
        let password = params.Password;

        if (!email || !password) {
            res.status(400).json({
                message: 'Email or Password is missing',
                status: 400,
            });
        } else {

            const query = "SELECT * FROM Users where ??=?";
            const fields = ['Email', email];

            dbConnection.query(query, fields, (err, results, fields) => {

                if (!err && results && results.length > 0) {

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
            })
        }
    });
}

module.exports = initLoginApi;
