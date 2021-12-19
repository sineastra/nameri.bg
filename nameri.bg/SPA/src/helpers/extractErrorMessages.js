const extractErrorMessages = (errors = [], errorMappings = null) => {
	return errorMappings
		? errors
			.filter(([key, value]) => value === false)
			.map(([key, value]) => errorMappings[key])
		: errors.map(x => x.msg)
}

export default extractErrorMessages