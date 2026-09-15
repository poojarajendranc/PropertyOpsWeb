const successResponse = (res,
    statusCode = 200,
    message = "Success",
    data = null
) => {
    return res.status(statusCode).json({
        statusCode,
        success: true,
        message,
        data
    })
}

const errorResponse = (
    res,
    statusCode = 500,
    message = "Something went wrong",
    data = null
) => {
    return res.status(statusCode).json({
        statusCode,
        success: false,
        message,
        data
    })

}

export default  {
    successResponse,
    errorResponse
}