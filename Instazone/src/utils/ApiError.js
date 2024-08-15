export class ApiError extends Error {
  constructor(statusCode, message = "", success = false, path = "") {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = success;
    this.path = path;
  }
}
