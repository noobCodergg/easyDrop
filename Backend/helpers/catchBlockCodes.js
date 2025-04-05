const {printError}=require('./controllerProfile')
const { statusCode } = require("./httpStatusCode")

module.exports.catchBlockCodes = (res, err) => {
	printError(err.message, __error_function)
	return res.status(statusCode.SERVER_ERROR).send({
		flag: "FAIL",
		msg: "Internal Server Error"
	})
}