import styles from "./StyledLinkBtn.module.css"


function StyledBtn ({ className, text, href = "", onClick, children }) {
	return (
		<button className={ `${ styles.styledBtn } ${ className }` } onClick={ onClick }>
			{ children }
			{ text }
		</button>
	)
}

export default StyledBtn