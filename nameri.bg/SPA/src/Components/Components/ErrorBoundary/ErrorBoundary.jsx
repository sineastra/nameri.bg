import React from "react"


class ErrorBoundary extends React.Component {
	componentDidCatch (error, errorInfo) {
		console.log('KO STAA BRAT')
	}

	render () {
		return this.props.children
	}
}

export default ErrorBoundary