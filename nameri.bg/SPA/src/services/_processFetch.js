import extractErrorMessages from "../helpers/extractErrorMessages.js"


const _processFetch = async (service, setBoundaryError, setSoftErrors) => {

	try {
		return await service()
	} catch (err) {
		if (!err.softError) {
			setBoundaryError(err.status, err.msg)
		} else {
			setSoftErrors(extractErrorMessages(err.errors))
		}
	}
}

export default _processFetch