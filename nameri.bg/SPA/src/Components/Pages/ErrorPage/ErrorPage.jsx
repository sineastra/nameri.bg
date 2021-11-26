import { useLocation } from "react-router-dom"


const ErrorPage = (props) => {
	const location = useLocation()
	const serverNotResponding = location.state.statusCode === undefined && location.state.status === undefined

	return (
		serverNotResponding
			? <div>Something went wrong. Please wait a few minutes and try again!</div>
			: <div>{ location.state.statusCode } - { location.state.status }</div>

	)
}

export default ErrorPage