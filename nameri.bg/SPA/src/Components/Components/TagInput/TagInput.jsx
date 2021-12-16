import styles from "./TagInput.module.css"
import Tag from "../Tag/Tag.jsx"


const TagInput = ({
	                  inputName = 'tags',
	                  wrapperClassName = "",
	                  onKeyPress,
	                  onFocus,
	                  removeDataEntry,
	                  errors,
	                  data,
	                  inputText,
                  }) => {

	return (
		<div className={ wrapperClassName }>
			<input
				type="text"
				name={ inputName }
				placeholder={ inputText }
				onKeyPress={ onKeyPress }
				onFocus={ onFocus }
				autoComplete="off"
				className={ errors.tags === false ? styles.invalidInput : '' }
			/>
			<div
				className={ `${ styles.tagsDiv } ${ data.length > 0 ? styles.showTagsDiv : styles.hideTagsDiv }` }>
				{ data.map(x => <Tag text={ x } removeDataEntry={ () => removeDataEntry(x) }/>) }
			</div>
			{ errors.tags === false && <div className={ styles.errorElement }>Минимум 2 тага!</div> }
		</div>
	)
}

export default TagInput