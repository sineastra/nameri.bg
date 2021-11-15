import { Link } from "react-router-dom"
import styles from "./StyledBtn.module.css"


function StyledBtn ({ className, text, href = "/", onClick }) {
	return <Link className={`${styles.styledBtn} ${className}`} to={href} onClick={onClick}>{text}</Link>
}

export default StyledBtn