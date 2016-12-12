exports.getSessionUser = function (req) {
    var user = "";
    if (req.session.user) {
        user = req.session.user.user;
    } else if (req.query.user) {
        user = req.query.user;
    }

    return user;
};