const baseUrl = `${ process.env.REACT_APP_REST_API_ADDRESS }/api`

const abstractFetch = async (url, body) => {
	return new Promise((resolve, reject) => {
		// TODO: refactor this so it can parse any type of response, not only json.

		fetch(`${ baseUrl }${ url }`, body)
			.then(data => data.json())
			.then(data => resolve(data))
			.catch(e => reject({ status: e.status, statusCode: e.statusCode }))

	})
}

const abstractRequest = async (url) => {
	return new Promise((resolve, reject) => {
		abstractFetch(url).then(response => {
			if (response.data === undefined) {
				reject({ status: response.status, statusCode: response.statusCode })
			}

			resolve(response.data)
		}).catch(e => reject({ status: e.status, statusCode: e.statusCode }))
	})
}

export { abstractFetch, abstractRequest }