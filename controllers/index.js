require('../config/db.connection');

module.exports = {
    articles: require("./articles_controller"),
    auth: require('./auth_controller'),
}