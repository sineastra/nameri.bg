const stringifyFetchBody = (data, method, additionalHeaders = {}) => ({
	method,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': process.env.REACT_APP_ORIGIN,
		...additionalHeaders,
	},
	body: JSON.stringify(data),
})

export {
	stringifyFetchBody,
}