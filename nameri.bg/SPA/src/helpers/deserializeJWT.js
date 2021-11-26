import jwtDecode from "jwt-decode"


const deserializeJWT = (token) => {
	return jwtDecode(token)
}

export default deserializeJWT