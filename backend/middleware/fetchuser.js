var jwt = require('jsonwebtoken');
const SECRET = 'asjk@pli%^iw987wdkn';

const fetchuser = (req, res, next) => {
    const token = req.header('auth_token');

    if(!token) {
        res.status(401).send({ error : 'Please authenticate using a token' });
    }

    try {
        const data  = jwt.verify(token, SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ errors : `Please authenticate using a token , ${error}` });
    }
}

module.exports = fetchuser;