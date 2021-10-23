let initWelcomeApi = (app) => {
    app.get('/', (req, res) => {
        res.json({
            message: 'welcome to the node server',
            stat: 200
        })
    })
}

module.exports = initWelcomeApi;
