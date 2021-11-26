const baseUrl = `${ process.env.REACT_APP_REST_API_ADDRESS }/api`

const baseFetch = async (url, body) => {
	return new Promise((resolve, reject) => {
		// TODO: refactor this so it can parse any type of response, not only json.

		fetch(`${ baseUrl }${ url }`, body)
			.then(data => data.json())
			.then(data => resolve(data))
			.catch(e => reject(e))

	})
}

const baseRequest = async (url) => {
	return new Promise((resolve, reject) => {
		baseFetch(url).then(response => {
			if (response.data === undefined) {
				reject({ status: response.status, statusCode: response.statusCode })
			}

			resolve(response.data)
		}).catch(e => reject(e))
	})
}

export { baseFetch, baseRequest }