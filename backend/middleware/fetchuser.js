var jwt = require('jsonwebtoken');
const JWT_SECRET = "riser@"

const fetchuser = (req, res, next) => {
    //get the user from jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'Please authenticate user using valid token' })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        console.log(req.user)
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate user using valid token' })
    }
    next();
}

module.exports = fetchuser;
