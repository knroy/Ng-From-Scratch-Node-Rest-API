const express = require('express');

const authenticationModule = require('./authentication');
const welcomeModule = require('./welcome');
const uamModule = require('./uam');
const blogModule = require('./blog');
const middleWares = require('./middlewares');

const app = express();
const port = 3000;

// initializing middlewares
middleWares(app);

// initiating authentication module
authenticationModule(app);

// initiating welcome module
welcomeModule(app);

// initiating uam module
uamModule(app);

// initiating blog module
blogModule(app);


app.listen(port, () => {
    console.log('Server is running at port: ', port);
})
