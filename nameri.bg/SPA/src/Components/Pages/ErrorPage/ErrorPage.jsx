import { useLocation } from "react-router-dom"


const ErrorPage = (props) => {
	const location = useLocation()

	return (
		<div>{ location.state.statusCode } - { location.state.status }</div>
	)
}

export default ErrorPage