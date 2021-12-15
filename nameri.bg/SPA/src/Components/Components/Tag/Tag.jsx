import styles from "./Tag.module.css"


const TagElement = ({ text, removeTag, className }) => {
	return (
		<div className={ `${ styles.tagElement } ${ className }` }>
			{ text } <span  className={styles.closeBtn} onClick={ removeTag }>x</span>
		</div>
	)
}

export default TagElement