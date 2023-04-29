const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    // console.log(req.get('Authorization'));

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'someveryverytrickyhash');
    }
    catch(err) {
        res.status(500).json({
            message: 'Something went wrong...'
        })
    }
    if(!decodedToken) {
        res.status(400).json({
            message: 'Not Authenticated!'
        })
    }
    req.userId = decodedToken.userId;
    next();
}