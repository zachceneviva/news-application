require('../config/db.connection')

module.exports = {
    User: require("./user"),
    Comment: require("./Comments"),
    Article: require("./article"),
};


