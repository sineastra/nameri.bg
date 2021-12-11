const baseUrl = `${ process.env.REACT_APP_REST_API_ADDRESS }/api`

const abstractFetch = async (url, body) => {
	let predefinedBody = {
		method: "GET",
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': process.env.REACT_APP_ORIGIN,
		},
		withCredentials: true,
	}
	predefinedBody = Object.assign(predefinedBody, body || {})

	return new Promise((resolve, reject) => {
		// TODO: refactor this so it can parse any type of response, not only json.

		fetch(`${ baseUrl }${ url }`, predefinedBody)
			.then(data => data.json())
			.then(data => resolve(data))
			.catch(e => reject({ status: e.status, statusCode: e.statusCode }))

	})
}

const abstractGetRequest = async (url) => {
	return new Promise((resolve, reject) => {
		abstractFetch(url).then(response => {
			if (response.data === undefined) {
				reject({ status: response.status, statusCode: response.statusCode })
			}

			resolve(response.data)
		}).catch(e => reject({ status: e.status, statusCode: e.statusCode }))
	})
}

export { abstractFetch, abstractGetRequest }