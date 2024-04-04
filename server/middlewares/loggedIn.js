const loggedIn = (req, res, next) => {
    if (!req.session.users) {
        return res.status(401).json('Du är inte inloggad');
    }
    next();
}

module.exports = { loggedIn }