import processNewToken from "../helpers/processNewToken.js"


const baseUrl = `${ process.env.REACT_APP_REST_API_ADDRESS }/api`

const abstractFetch = (url, body, method = "GET") => {
	let predefinedBody = {
		method,
		headers: {
			'Access-Control-Allow-Origin': process.env.REACT_APP_ORIGIN,
		},
		credentials: 'include',
	}
	predefinedBody = Object.assign(predefinedBody, body || {})

	return new Promise((resolve, reject) => {
		fetch(`${ baseUrl }${ url }`, predefinedBody)
			.then(res => res.json())
			.then(resData => {
				if (resData.data === undefined) {
					reject(resData)
				}

				console.log(resData)
				resolve(resData.data)
			})
			.catch(e => {
				reject(e)
			})

	})
}

const abstractFormDataRequest = (url, formData, method) => {
	const body = {
		body: formData,
	}

	return abstractFetch(url, body, method)
}

const abstractPostFormRequest = (url, formData, method) => {
	const body = {
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	}

	return abstractFetch(url, body, method)
}

export { abstractFetch, abstractFormDataRequest, abstractPostFormRequest }