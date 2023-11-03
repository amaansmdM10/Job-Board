const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) =>{

    let error= { ...err };
    error.message = err.message;
    if(err.name === "CastError"){
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message , 404);
    }
    //mongoose duplicate
    if(err.code === 11000){
        const message = `Duplicate Field value entered`;
        error = new ErrorResponse(message , 404);
    }

    //validation
    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map(val=> val.message)[0];
        error = new ErrorResponse(message , 400);   
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}
module.exports = errorHandler;