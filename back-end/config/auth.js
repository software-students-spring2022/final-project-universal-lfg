const jwt = require("jsonwebtoken");
require("dotenv").config({ silent: true });
function ensureAuthenticated (req, res, next) {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.userId = decoded.user_id;
        // console.log(req.userId)
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}

module.exports = ensureAuthenticated;