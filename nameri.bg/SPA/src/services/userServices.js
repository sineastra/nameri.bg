const baseUrl = `${ process.env.REACT_APP_REST_API_ADDRESS }/api`

const userServices = {
	login: (formData) => fetch(`${ baseUrl }/login`, {
		method: "POST",
		body: formData,
	}),
	register: (formData) => fetch(`${ baseUrl }/register`, {
		method: "POST",
		body: formData,
	}),
}

export default userServices