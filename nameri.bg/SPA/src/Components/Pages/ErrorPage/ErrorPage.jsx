import styles from "./ErrorPage.module.css"
import { Link } from "react-router-dom"


const ErrorPage = (props) => {
	return (
		<div className={ styles.errorWrapper }>
			<div className={ styles.errorImgDiv }/>
			<div className={ styles.svgWrapper }>
				<div className={ styles.svgInnerWrapper }>
					<div className={ styles.statusDiv }>404</div>

					<h3 className={ styles.header }>You're in the wrong place</h3>

					<Link to="/" className={ styles.redirectBtn }>Take me back to safety, please!</Link>
				</div>
			</div>
		</div>
	)
}

export default ErrorPage