export class ApiError extends Error {
  constructor(statusCode, message, success, path) {
    super(message);
    this.statusCode = statusCode;
    this.success = success;
    this.path = path;
  }
}
