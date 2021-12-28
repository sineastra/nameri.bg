import styles from "./ErrorPage.module.css"
import { Link } from "react-router-dom"
import { useContext } from "react"
import ErrorBoundaryContext from "../../Contexts/ErrorBoundaryContext.jsx"


const ErrorPage = (props) => {
	const errorContext = useContext(ErrorBoundaryContext)

	return (
		<div className={ styles.errorWrapper }>
			<div className={ styles.errorImgDiv }/>
			<div className={ styles.svgWrapper }>
				<div className={ styles.svgInnerWrapper }>
					<div className={ styles.statusDiv }>404</div>

					<h3 className={ styles.header }>You're in the wrong place</h3>

					<Link to="/" className={ styles.redirectBtn }
					      onClick={ () => errorContext.resetBoundaryError() }>Take me back to
						safety, please!
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ErrorPage