import React from "react"
import ErrorBoundaryContext from "../../Contexts/ErrorBoundaryContext.jsx"
import ErrorPage from "../../Pages/ErrorPage/ErrorPage.jsx"


class ErrorBoundary extends React.Component {
	constructor (props) {
		super(props)
		this.state = { error: null, errorInfo: null }
	}

	componentDidCatch (error, errorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo,
		})
	}

	setBoundaryError (error, errorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo,
		})
	}

	resetBoundaryError () {
		this.setState({
			error: null,
			errorInfo: null,
		})
	}

	render () {

		return (
			<ErrorBoundaryContext.Provider
				value={ {
					error: this.state.errorInfo,
					setBoundaryError: (error, errorInfo) => this.setBoundaryError(error, errorInfo),
					resetBoundaryError: () => this.resetBoundaryError(),
				} }>

				{ !!this.state.errorInfo
					? <ErrorPage/>
					: this.props.children
				}

			</ErrorBoundaryContext.Provider>
		)
	}
}

export default ErrorBoundary