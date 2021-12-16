import styles from "./Tag.module.css"


const TagElement = ({ text, removeDataEntry, className }) => {
	return (
		<div className={ `${ styles.tagElement } ${ className }` }>
			{ text } <span  className={styles.closeBtn} onClick={ removeDataEntry }>x</span>
		</div>
	)
}

export default TagElement