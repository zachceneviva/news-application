require('../config/db.connection');

module.exports = {
    articles: require("./articles_controller"),
    auth: require('./articles_controller'),
}