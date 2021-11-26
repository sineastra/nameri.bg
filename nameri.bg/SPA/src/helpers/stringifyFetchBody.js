const stringifyFetchBody = (data, method, additionalHeaders = {}) => ({
	method,
	headers: {
		'Content-Type': 'application/json',
		...additionalHeaders,
	},
	credentials: 'include',
	body: JSON.stringify(data),
})

export {
	stringifyFetchBody,
}