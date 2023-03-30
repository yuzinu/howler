module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.oidc.isAuthenticated()) {
            return next();
        } else {
            res.redirect("/");
        }
    },
};
