const jwt = require('jsonwebtoken');
const blocklist = require('./tokenBlocklist');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Brak tokenu' });
    }

    const token = authHeader.split(' ')[1];

    if (blocklist.has(token)) {
        return res.status(401).json({ message: 'Token unieważniony' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.token = token;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Nieważny token' });
    }
};

module.exports = authMiddleware;
