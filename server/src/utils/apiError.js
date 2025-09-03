class apiError extends Error {
    constructor(statusCode, errors = [], message = "something went wrong", stack=""){
        super(message)
        this.statusCode = statusCode,
        this.message = message
        this.success = false
        this.errors = errors
        if(stack){
            this.stack = stack
        }
        else{
            ////helps in tracing the whole function erros starting to end
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {apiError}