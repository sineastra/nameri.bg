// this method allows for us to pass array of object entries of errors, and map them against
// passed object, so every error gets custom message, or just display the error
const extractErrorMessages = (errors = [], errorMappings = null) => {

	return errorMappings
		? errors
			.filter(([key, value]) => value === false)
			.map(([key, value]) => errorMappings[key])
		: errors.map(x => x.msg)
}

export default extractErrorMessages