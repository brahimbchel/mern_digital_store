// backend/middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');
const { logEvents } = require('./logger')

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 10, // limit each IP to 5 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
    handler: (req, res, next, options) => {
        logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = { limiter };
