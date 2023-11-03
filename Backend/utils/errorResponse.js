class ErrorResponse extends Error{
    constructor(message){
        super(message);
        this.name = "Error Response";
    }
}
module.exports = ErrorResponse;
