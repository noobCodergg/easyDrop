const validateApiFields = (fields) => {
	const errors = [null, undefined, ""]

	const apiKeys = Object.keys(fields)

	for(let each of apiKeys){
		if(errors.includes(fields[each])){
			return false
		}
	}

	return true
}

module.exports = validateApiFields