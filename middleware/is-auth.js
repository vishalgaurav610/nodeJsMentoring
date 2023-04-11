import jwt from 'jsonwebtoken';

const authHandler = function (req, res, next) {
  if (req.originalUrl.replace(/\//g, "") != "login") {
        const authHeader = req.get('Authorization');
        let hasError = false;
        if (!authHeader) {
            return res.status(401).send("No token provided");
        }
        const token = authHeader.split(' ')[1];
        console.log('authheader : ' + authHeader)
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, 'nodejsmentoring');
        } catch (err) {
            return res.status(403).send("Failed to authenticate token");
        }
        if (!decodedToken || hasError) {
            return res.status(403).send("Failed to authenticate token");
        }
  }
  next();
};

export default authHandler;
