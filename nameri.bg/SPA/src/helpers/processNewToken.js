import deserializeJWT from "./deserializeJWT.js"
import Cookies from "js-cookie"


const processNewToken = (token) => {
	const userData = deserializeJWT(token)
	Cookies.set(process.env.REACT_APP_JWT_COOKIE_NAME, token)

	return userData
}

export default processNewToken