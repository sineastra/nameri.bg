import React from "react"
import { Navigate } from "react-router-dom"


class ErrorBoundary extends React.Component {
	constructor (props) {
		super(props)
		this.state = { error: null, errorInfo: null }
	}

	componentDidCatch (error, errorInfo) {
		console.log(error)
		console.log(errorInfo)

		// Catch errors in any components below and re-render with error message
		this.setState({
			error: error,
			errorInfo: errorInfo,
		})
		// You can also log error messages to an error reporting service here
	}

	componentDidUpdate (prevProps, prevState, snapshot) {
		if (this.state.errorInfo) {
			this.resetError()
		}
	}

	triggerError (error, errorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo,
		})
	}

	resetError () {
		this.setState({
			error: null,
			errorInfo: null,
		})
	}

	render () {
		if (this.state.errorInfo) {

			// Error path
			return (
				<Navigate to="/error" replace={ true }/>
			)
		}
		// Normally, just render children
		return this.props.children
	}
}

export default ErrorBoundary