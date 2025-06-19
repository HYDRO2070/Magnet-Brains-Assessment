//iscode mein ek default class errorHandler ko inherit kiya hai aur do cheeze pass ki hai  message and
// statuscode jisse ye ek clean or understandable errorr generate kr ke dega
class ErrorHandler extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor)
    }
}


module.exports = ErrorHandler