const baseUrl = `${ process.env.REACT_APP_REST_API_ADDRESS }/api`

const abstractFetch = async (url, body, method = "GET") => {
	let predefinedBody = {
		method,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': process.env.REACT_APP_ORIGIN,
		},
		credentials: 'include',
	}
	predefinedBody = Object.assign(predefinedBody, body || {})

	return new Promise((resolve, reject) => {
		// TODO: refactor this so it can parse any type of response, not only json.

		fetch(`${ baseUrl }${ url }`, predefinedBody)
			.then(data => {
				if (data.status >= 400) {
					console.log(data)
					throw new Error({ status: data.status, statusText: data.statusText, msg: data.msg })
				}
				return data.json()
			})
			.then(data => resolve(data))
			.catch(e => {
				reject({ status: e.status, statusText: e.statusText })
			})

	})
}

const abstractGetRequest = async (url) => {
	return new Promise((resolve, reject) => {
		abstractFetch(url).then(response => {
			if (response.data === undefined) {
				reject({ status: response.status, statusText: response.statusText })
			}

			resolve(response.data)
		}).catch(e => reject({
			status: e.status || 'No status',
			statusText: e.statusText || 'No status text',
			msg: e,
		}))
	})
}

const abstractFormDataRequest = async (url, formData, method) => {
	return new Promise((resolve, reject) => {

		const body = {
			method,
			headers: {
				'Access-Control-Allow-Origin': process.env.REACT_APP_ORIGIN,
			},
			credentials: 'include',
			body: formData,
		}

		abstractFetch(url, body).then(data => resolve(data))
	})
}

export { abstractFetch, abstractGetRequest, abstractFormDataRequest }