/**
 * @description: Request result set
 */
export enum ResultEnum {
  HTTP_OK = 200,
  HTTP_CREATED = 201,
  HTTP_UNAUTHORIZED = 401,
  HTTP_NOT_FOUND = 404,
  HTTP_CONFLICT = 409,
  UNKNOWN_ERROR = 419,
  HTTP_UNPROCESSABLE_ENTITY = 422,
  HTTP_INTERNAL_SERVER_ERROR = 500,
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
