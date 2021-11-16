import styles from "./AuthHeader.module.css"
import StyledBtn from "../StyledBtn/StyledBtn.jsx"


const AuthHeader = ({ logo, linkText, href, className }) => {

	return (
		<div className={`${styles.mainWrapper} ${className}`}>
			<div>
				<img src={logo} alt="Site Logo" className={styles.logoImg}/>
			</div>
			<div>

				<StyledBtn className={styles.link} href={href} text={linkText}>

				</StyledBtn>

			</div>
		</div>
	)
}

export default AuthHeader