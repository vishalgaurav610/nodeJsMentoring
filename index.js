import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";

const PORT = process.env.PORT || 3001;

import serviceLogger from "./utils/serviceLogger.js";
import appLogger from "./utils/appLogger.js";
import authHandler from "./middleware/is-auth.js";

import userRoute from './router/UserRoute.js';
import groupRoute from './router/GroupRoute.js';

const corsOptions = {
    origin: `http://localhost:${PORT}`,
};

const server = express()
    .use(bodyParser.json())

server.use(cors(corsOptions));
server.use(serviceLogger);
server.use(authHandler)
server.use('/user', userRoute);
server.use('/group', groupRoute);

server.use((err, req, res, next) => {
    err.status == 500 && res.status(500).send("Could not perform the operation!");
    appLogger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
        req.originalUrl
      } - ${req.method}`
    );
    next();
});

process.on("unhandledRejection", (error) => {
    appLogger.error("Unhandled rejection Logger...", error);
});

process.on("uncaughtException", (error) => {
    appLogger.error("UncaughtException Logger...", error);
});
    
server.listen(PORT, () => console.log('Server started'));
