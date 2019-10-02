const { auth } = require('../models/auth.model');

const allowedRoutes = [
    '/api/v1/auth/generate-token',
];

async function authMiddleware(req, res, next) {

    if (allowedRoutes.includes(req.path)) {
        next();
        return;
    }

    // Extract the Authorization Header
    const { authorization } = req.headers;
    const token = !authorization ? false :  authorization.split(' ')[1];

    // Check that the Token exists
    if (!token) {
        const apiResp = auth.getUnauthorizedResp('No Auth Token Exists', 401);
        res.status(apiResp.status).json(apiResp).end();
        return;
    }

    const tokenResult = await auth.validateToken(token);
    
    if (tokenResult) {
        next();
    } else {
        const apiResp = auth.getUnauthorizedResp('Invalid token received', 403);
        res.status(apiResp.status).json(apiResp).end();
        return;
    }

}

module.exports = authMiddleware;