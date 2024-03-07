export enum HttpCode {
  'OK' = 200,
  'CREATED' = 201,
  'ACCEPTED' = 202,
  'MOVED_PERMANENTLY' = 301,
  'BAD_REQUEST' = 400,
  'UNAUTHORIZED' = 401,
  'FORBIDDEN' = 403,
  'NOT_FOUND' = 404,
  'NOT_ALLOWED' = 405,
  'TOO_MANY_REQUESTS' = 429,
  'INTERNAL_SERVER_ERROR' = 500,
}

export enum ReasonPhrase {
  'OK' = 'Ok',
  'CREATED' = 'Created.',
  'ACCEPTED' = 'Accepted.',
  'MOVED_PERMANENTLY' = 'Moved Permanently.',
  'BAD_REQUEST' = 'Bad request.',
  'UNAUTHORIZED' = 'Unauthorized.',
  'FORBIDDEN' = 'Forbidden.',
  'NOT_FOUND' = 'Not Found.',
  'NOT_ALLOWED' = 'Not Allowed.',
  'TOO_MANY_REQUESTS' = 'Too Many Requests.',
  'INTERNAL_SERVER_ERROR' = 'Internal Server Error.',
}

class HttpException extends Error {
  public readonly status: HttpCode;
  public readonly message: string;

  constructor(status: HttpCode, message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.status = status;
    this.message = message;

    Error.captureStackTrace(this);
  }
}

export default HttpException;
