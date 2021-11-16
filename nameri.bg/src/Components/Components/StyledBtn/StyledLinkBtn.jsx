import { Link } from "react-router-dom"
import styles from "./StyledBtn.module.css"


function StyledLinkBtn ({ className, text, href = "", onClick, children }) {
	return (
		<Link className={`${styles.styledBtn} ${className}`} to={href} onClick={onClick}>
			{children}
			{text}
		</Link>
	)
}

export default StyledLinkBtn