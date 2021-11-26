const baseFetch = async (url, body) => {
	return new Promise((res, rej) => {
		let data

		try {
			data = fetch(url, body)
			res(data)
		} catch (e) {
			rej(e)
		}
	})
}

export default baseFetch