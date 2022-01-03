import extractErrorMessages from "../helpers/extractErrorMessages.js"

// I import this utility function in the AppWrapper component and create context (Utility Context) there,
// for partial bind it to the contexts (BondaryContext and softErrors context) So i wont have to import these 2 contexts
// In every component i need to use it. It is called processRequest. This _processFetch can be used without any contexts ofc.
// The setBoundaryError and setSoftErros are functions that respectively throw the error and display it in a Boundary
// component or rerender the current component with error notifications (setSoftErrors)


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

export {
	_processFetch,
}