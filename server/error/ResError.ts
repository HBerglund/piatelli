interface ResponseError {
  statusCode: number;
}

class ResponseError extends Error {
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ResponseError;
