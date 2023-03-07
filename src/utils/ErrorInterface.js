class ServerError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor)
  }
  static badRequest(code, message) {
    return new ServerError(code, message);
  }
  static internalError(message) {
    return new ServerError(500, message);
  }
}

module.exports = ServerError;