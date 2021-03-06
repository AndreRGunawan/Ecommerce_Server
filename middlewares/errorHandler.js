function errorHandler(err, req,res,next){
    console.log("=========================",err)
    if(err.message == "SequelizeValidationError"){
        const errors = err.errors.map(el => ({
            message : el.message
        }))
        return res.status(400).json({
            code:"400",
            type:"BadRequest",
            errors: errors
        })
    } 
    //buat error handler untuk err.name == sequelize unique constraint error
    else if(err.message == "BadRequest"){
        return res.status(400).json({
            errors: err.errors
        })
    } else if(err.message == "User Not Found"){
        return res.status(404).json({
            errors: err.errors
        })
    }else if(err.message == "JsonWebTokenError"){
        return res.status(401).json({
            errors: err.errors,
            message: "Please sign in first"
        })
    } else {
        return res.status(500).json({
            message: "InternalServerError",
            error: err.stack
        })
    }
}

module.exports = errorHandler