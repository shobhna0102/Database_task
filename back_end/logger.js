require("winston-mongodb");
const { format, transports } = require("winston");
const winston = require("winston");

const logConfiguration = {
    transports: [
        new transports.File({
            filename: "logs/error.log",
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
            )
        }),
        new transports.MongoDB({
            level: "error",
            //mongo database connection link
            db: "mongodb://localhost:27017/shop",
            options: {
                useUnifiedTopology: true,
            },
            // A collection to save json formatted logs
            collection: "logs",
            format: format.combine(
                format.timestamp(),
                // Convert logs to a json format
                format.json()
            ),
        }),
    ],
};

const logger = winston.createLogger(logConfiguration);

//module.exports=logConfiguration;
module.exports = logger
