import styles from "./AuthHeader.module.css"
import StyledLinkBtn from "../StyledLinkBtn/StyledLinkBtn.jsx"


const AuthHeader = ({ logo, href, className, authType }) => {
	const linkText = authType === 'login' ? "Влез" : "Регистрация"

	return (
		<div className={ `${ styles.mainWrapper } ${ className }` }>
			<div>
				<img src={ logo } alt="Site Logo" className={ styles.logoImg }/>
			</div>
			<div>

				<StyledLinkBtn className={ styles.link } href={ href } text={ linkText }>

				</StyledLinkBtn>
			</div>
		</div>
	)
}

export default AuthHeader