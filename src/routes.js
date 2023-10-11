function routes(app) {
    app.use('/usuario', require('./routes/usuario.js'));
    app.use('/GameList', require('./routes/GameList.js'));
    return;
}

module.exports = routes;