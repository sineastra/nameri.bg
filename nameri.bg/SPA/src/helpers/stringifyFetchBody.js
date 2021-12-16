const stringifyFetchBody = (data, method, additionalHeaders = {}) => ({
	method,
	headers: {
		'Content-Type': 'application/json',
		...additionalHeaders,
	},
	body: JSON.stringify(data),
})

export {
	stringifyFetchBody,
}