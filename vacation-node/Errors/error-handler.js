let errorHandler = (e, request, response, next) => {
    // e = my Server error --> IT HAS AN ENUM INSIDE (!!) called errorType
    if (e.errorType != undefined && e.errorType.isShowStackTrace) {
        console.error(e);
        response.status(e.errorType.httpCode).json({ error: e.errorType.message });
        return;
    }
    response.status(700).json({ error: "General error" });
}

module.exports = errorHandler;