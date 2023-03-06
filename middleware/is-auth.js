import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.get('Authorization');
    let hasError = false;
    if (!authHeader) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        error.status = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    console.log('authheader : ' + authHeader)
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'nodejsmentoring');
    } catch (err) {
        // err.message = token + ' ' + decodedToken;
        // err.statusCode = 500;
        // throw err;
        hasError = true;
    }
    if (!decodedToken || hasError) {
        if (!decodedToken) {
            const error = new Error('Forbidden');
            error.statusCode = 403;
            error.status = 403;
            throw error;
        }
    }
    req.userId = decodedToken.userId;
    req.token = token;
    next();
};

export default authMiddleware;