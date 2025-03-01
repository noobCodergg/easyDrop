const path = require("path")

module.exports.controllerProfile = () => {
	Object.defineProperty(global, '__stack', {
		get: function() {
			var orig = Error.prepareStackTrace;
			Error.prepareStackTrace = function(_, stack) {
				return stack;
			};
			var err = new Error;
			Error.captureStackTrace(err, arguments.callee);
			var stack = err.stack;
			Error.prepareStackTrace = orig;
			return stack;
		}
	});
	
	Object.defineProperty(global, '__error_function', {
		get: function() {
			var callerStack = __stack[1];
			var functionName = callerStack.getFunctionName();
			var fileName = callerStack.getFileName();
			return `${path.basename(fileName)} | ${functionName}`
		}
	});
}

module.exports.printError = (errorMessage, errorFunction) => {
	console.log(`📌 ${errorFunction} | ${errorMessage}`)
}