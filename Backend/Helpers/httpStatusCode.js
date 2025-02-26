module.exports.statusCode = {
	OK: 200, //This status code indicates that the request was successful
	CREATED: 201, //This code is used to indicate successful creation of a resource
	UPDATED: 204, //This status code is often used for successful DELETE or PUT requests where no response body is needed
	BAD_REQUEST: 400, //This code signifies that the server could not understand the request due to client error, such as malformed syntax or missing required parameters
	UNAUTHORIZED: 401, //This status code indicates that the request requires user authentication
	FORBIDDEN: 403, //This code signifies that the server understood the request, but the client does not have permission to access the requested resource
	NOT_FOUND: 404, //It is commonly used when the endpoint or resource URL does not exist
	DUPLICATE: 409, //It is commonly used for duplication or conflict cases
	SERVER_ERROR: 500, //This code indicates that an unexpected error occurred on the server while processing the request
}