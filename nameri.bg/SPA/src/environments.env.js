const restApiPort = '3050'

REACT_APP_REST_API_ADDRESS = process.env.NODE_ENV === 'development'
	? `http://http://localhost:${ restApiPort }`
	: 'put address after deploying'