require('../config/db.connection');


module.exports = {
    auth: require('./auth_controller'),
    articles: require("./articles_controller"),
    comment: require('./comment_controller'),
}
